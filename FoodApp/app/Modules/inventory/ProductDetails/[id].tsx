import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { PRODUCTS } from '@/constants/Products';
import { useCart } from '@/context/CartContext';
import { Fonts } from '@/constants/Fonts';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { getProducts } from '@/app/API/ProductApi';
import { useQuery } from '@tanstack/react-query';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
    const { id }: { id: string } = useLocalSearchParams();
    const router = useRouter();
    const { addToCart, itemCount } = useCart();


    const { data, isLoading, isError } = useQuery({
        queryKey: ["products", id],
        queryFn: () => getProducts(id, "", ""),
        enabled: !!id,
    });

    console.log("API data:", data);

    const product = data?.data?.find((p: any) => p._id === id);

    if (!product) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Product not found</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={{ color: '#00A300', marginTop: 10, fontFamily: Fonts.bold }}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id);

    const benefits = [
        { id: 1, icon: 'leaf-outline', label: 'Eco-Friendly' },
        { id: 2, icon: 'shield-checkmark-outline', label: 'Skin Safe' },
        { id: 3, icon: 'water-outline', label: 'Pure Oil' },
    ];

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar barStyle="dark-content" />

            {/* HEADER IMAGE SECTION */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: data?.data?.imageurl }} style={styles.mainImage} />
                <SafeAreaView style={styles.headerActions}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                        <Feather name="chevron-left" size={24} color="#1a1a1a" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.heartBtn} onPress={() => router.push('/cart' as any)}>
                        <Ionicons name="cart-outline" size={22} color="#1a1a1a" />
                        {itemCount > 0 && (
                            <View style={styles.cartBadge}>
                                <Text style={styles.cartBadgeText}>{itemCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </SafeAreaView>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.infoSection}>
                    {/* TITLE & PRICE */}
                    <View style={styles.titleRow}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.tagBadge}>
                                <Text style={styles.tagText}>{product.category}</Text>
                            </View>
                            <Text style={styles.productName}>{product.name}</Text>
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={styles.productPrice}>{product.price}</Text>
                            <Text style={styles.taxLabel}>Inc. of all taxes</Text>
                        </View>
                    </View>

                    {/* RATING & WEIGHT */}
                    <View style={styles.metaRow}>
                        <View style={styles.ratingBox}>
                            <Ionicons name="star" size={14} color="#FFB000" />
                            <Text style={styles.metaText}>4.8</Text>
                        </View>
                        <Text style={styles.metaDivider}>•</Text>
                        <Text style={styles.metaText}>{product.weight}</Text>
                        <Text style={styles.metaDivider}>•</Text>
                        <Text style={styles.stockStatus}>In Stock</Text>
                    </View>

                    {/* BENEFITS GRID */}
                    <View style={styles.benefitRow}>
                        {benefits.map(item => (
                            <View key={item.id} style={styles.benefitItem}>
                                <Ionicons name={item.icon as any} size={20} color="#00A300" />
                                <Text style={styles.benefitLabel}>{item.label}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Product Details</Text>
                    <Text style={styles.description}>{product.description}</Text>

                    <View style={styles.divider} />

                    {/* SUGGESTED PRODUCTS */}
                    <Text style={styles.sectionTitle}>Frequently Bought Together</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestedScroll}>
                        {relatedProducts.length > 0 ? relatedProducts.map((p) => (
                            <TouchableOpacity
                                key={p.id}
                                style={styles.suggestedCard}
                                onPress={() => router.push(`/product/${p.id}` as any)}
                            >
                                <View style={styles.suggestedImgBg}>
                                    <Image source={{ uri: p.image }} style={styles.suggestedImage} />
                                </View>
                                <Text style={styles.suggestedName} numberOfLines={1}>{p.name}</Text>
                                <Text style={styles.suggestedPrice}>{p.price}</Text>
                            </TouchableOpacity>
                        )) : <Text style={styles.noMoreText}>No more products in this category.</Text>}
                    </ScrollView>
                </View>
            </ScrollView>

            {/* BOTTOM BAR */}
            <View style={styles.bottomBar}>
                <View style={styles.bottomContent}>
                    <View style={styles.qtyContainer}>
                        <Text style={styles.qtyTitle}>Unit Weight</Text>
                        <Text style={styles.qtyValue}>{product.weight}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.addCartBtn}
                        onPress={() => addToCart(product)}
                    >
                        <Text style={styles.addCartText}>Add to Basket</Text>
                        <Feather name="shopping-bag" size={18} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    imageContainer: { width: width, height: width * 0.9, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
    mainImage: { width: '80%', height: '80%', resizeMode: 'contain' },
    headerActions: {
        position: 'absolute',
        top: 10, left: 20, right: 20,
        flexDirection: 'row', justifyContent: 'space-between'
    },
    backBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
    heartBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },

    // Improved Cart Badge
    cartBadge: { position: 'absolute', top: -6, right: -6, minWidth: 20, height: 20, borderRadius: 10, backgroundColor: '#00A300', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4, borderWidth: 2, borderColor: '#fff' },
    cartBadgeText: { color: '#fff', fontSize: 10, fontFamily: Fonts.bold },

    scrollContent: { paddingBottom: 140 },
    infoSection: {
        padding: 24, backgroundColor: '#fff', borderTopLeftRadius: 35, borderTopRightRadius: 35, marginTop: -30,
        shadowColor: '#000', shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 5
    },
    titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    tagBadge: { backgroundColor: '#E6F6E6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, alignSelf: 'flex-start', marginBottom: 12 },
    tagText: { fontFamily: Fonts.bold, color: '#4CAF50', fontSize: 10, textTransform: 'uppercase' },
    productName: { fontFamily: Fonts.bold, fontSize: 24, color: '#1a1a1a', letterSpacing: -0.5 },
    priceContainer: { alignItems: 'flex-end' },
    productPrice: { fontFamily: Fonts.bold, fontSize: 26, color: '#00A300' },
    taxLabel: { fontSize: 10, color: '#999', fontFamily: Fonts.medium },

    metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 15 },
    ratingBox: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FFF9E6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    metaText: { fontFamily: Fonts.bold, fontSize: 13, color: '#666' },
    metaDivider: { color: '#DDD', fontSize: 13 },
    stockStatus: { color: '#00A300', fontFamily: Fonts.bold, fontSize: 13 },

    benefitRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, backgroundColor: '#F8F9FA', padding: 18, borderRadius: 20 },
    benefitItem: { alignItems: 'center', gap: 6 },
    benefitLabel: { fontFamily: Fonts.medium, fontSize: 11, color: '#555' },

    divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 25 },
    sectionTitle: { fontFamily: Fonts.bold, fontSize: 18, color: '#1a1a1a' },
    description: { fontFamily: Fonts.regular, fontSize: 15, color: '#666', lineHeight: 24, marginTop: 10 },

    suggestedScroll: { marginTop: 16, gap: 16 },
    suggestedCard: { width: 140 },
    suggestedImgBg: { width: 140, height: 140, borderRadius: 24, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' },
    suggestedImage: { width: '75%', height: '75%', resizeMode: 'contain' },
    suggestedName: { fontFamily: Fonts.bold, fontSize: 14, color: '#1a1a1a', marginTop: 10 },
    suggestedPrice: { fontFamily: Fonts.bold, fontSize: 13, color: '#00A300' },
    noMoreText: { fontFamily: Fonts.medium, color: '#999', fontSize: 13, marginTop: 10 },

    bottomBar: {
        position: 'absolute', bottom: 0, backgroundColor: '#fff',
        paddingTop: 15, paddingBottom: Platform.OS === 'ios' ? 35 : 20,
        paddingHorizontal: 24, borderTopWidth: 1, borderTopColor: '#F0F0F0', width: '100%'
    },
    bottomContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    qtyContainer: { gap: 2 },
    qtyTitle: { fontFamily: Fonts.medium, fontSize: 12, color: '#999' },
    qtyValue: { fontFamily: Fonts.bold, fontSize: 18, color: '#1a1a1a' },
    addCartBtn: {
        backgroundColor: '#00A300', flexDirection: 'row', alignItems: 'center', gap: 10,
        paddingHorizontal: 30, paddingVertical: 16, borderRadius: 20,
        shadowColor: '#00A300', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 6
    },
    addCartText: { color: '#fff', fontFamily: Fonts.bold, fontSize: 16 },
    errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    errorText: { fontFamily: Fonts.medium, fontSize: 16, color: '#666' }
});