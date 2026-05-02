import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Animated,
    Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts } from '@/constants/Fonts';
import { useRouter, Stack } from 'expo-router';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/constants/Products';
import { getProducts } from '@/app/API/ProductApi';
// import "../../assets/images/SOAP1.png"
const { width } = Dimensions.get('window');
import { StatusBar } from 'expo-status-bar';
import { useQuery } from '@tanstack/react-query';

export default function InventoryHomeScreen() {
    const router = useRouter();
    const { addToCart, itemCount } = useCart();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    //  C:\vignesh\ReactNative\foodapp\FoodApp\assets\images\SOAP3.png
    const rotateAnim = useRef(new Animated.Value(0)).current;


    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["products"],
        queryFn: () => getProducts("", "", "")
    });
    console.log("data", data?.data);

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    useEffect(() => {
        const timig = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timig);
    }, []);


    const bestSellers = PRODUCTS.slice(0, 4);

    const getslideimg = [
        {
            id: 1, title: 'Aloe Vera Power', subtitle: 'Tough on stains, soft on skin',
            image: require('../../../../assets/images/SOAP1.png'),

            bg: ['#00A300', '#76e076']
        },
        {
            id: 2, title: 'Skin Care', subtitle: 'Gentle daily protection',
            image: require('../../../../assets/images/SOAP2.png'),
            bg: ['#0047AB', '#8ECAE6']
        },
        {
            id: 3, title: 'Dishwash Liquid', subtitle: 'Removes grease instantly',
            image: require('../../../../assets/images/SOAP3.png'),
            bg: ['#FFB703', '#FDFFB6']
        },
        {
            id: 4, title: 'Combo Pack', subtitle: 'More value, more clean',
            image: require('../../../../assets/images/SOAP4.png'),
            bg: ['#6366F1', '#C7D2FE']
        },
    ] as const;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev === getslideimg.length - 1 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const handleAddToCart = (product: any) => addToCart(product);

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar style="light" translucent backgroundColor="transparent" />
            <Stack.Screen options={{ headerShown: false }} />


            {loading ? (
                <View style={styles.loading}>

                    <Animated.Image
                        source={require('../../../../assets/images/logo.png')}
                        style={{
                            width: 100,
                            height: 100,
                            resizeMode: 'contain',
                            transform: [
                                {
                                    rotate: rotateAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '360deg'],
                                    }),
                                },
                            ],
                        }}
                    />
                </View>
            ) : (
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                        {/* HEADER */}
                        <View style={styles.header}>
                            <View style={styles.userRow}>
                                <View style={styles.avatarWrap}>
                                    <Image source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36' }} style={styles.avatar} />
                                </View>
                                <View>
                                    <Text style={styles.greeting}>Welcome Back,</Text>
                                    <Text style={[styles.userName, { color: '#00A300' }]}>Vignesh</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.notifyBtn}
                                onPress={() => router.push('./') as any}
                            // onPress={() => router.push('/Modules/Module') as any}
                            >
                                <Feather name="shopping-bag" size={22} color="#000" />
                                {itemCount > 0 && (
                                    <View style={styles.cartBadge}>
                                        <Text style={styles.cartBadgeText}>{itemCount}</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* SEARCH BAR */}
                        <View style={styles.searchRow}>
                            <View style={styles.searchBox}>
                                <Feather name="search" size={18} color="#999" />
                                <TextInput placeholder="Search for cleaning power..." placeholderTextColor="#999" style={styles.searchInput} />
                            </View>
                            <TouchableOpacity style={styles.filterBtn}>
                                <Ionicons name="options-outline" size={22} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        {/* PROMO BANNER */}
                        <View style={styles.promoWrap}>
                            <LinearGradient colors={getslideimg[currentIndex].bg} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.promoCard}>
                                <View style={{ flex: 1.2 }}>
                                    <View style={styles.promoLabel}><Text style={styles.promoBadge}>NEW ARRIVAL</Text></View>
                                    <Text style={styles.promoTitle}>{getslideimg[currentIndex].title}</Text>
                                    <Text style={styles.promoSub} numberOfLines={2}>{getslideimg[currentIndex].subtitle}</Text>
                                    <TouchableOpacity style={styles.shopNowBtn}><Text style={styles.shopNowText}>Shop Now</Text></TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={getslideimg[currentIndex].image} style={styles.promoImg} resizeMode="contain" />
                                </View>
                            </LinearGradient>
                            <View style={styles.paginationRow}>
                                {getslideimg.map((_, i) => (
                                    <View key={i} style={[styles.pagDot, i === currentIndex && styles.pagDotActive]} />
                                ))}
                            </View>
                        </View>

                        {/* RANGE SELECTOR */}
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Shop by Range</Text>
                            <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
                            {bestSellers.map((cat) => (
                                <TouchableOpacity
                                    key={cat.id}
                                    style={styles.catItem}
                                    onPress={() => router.push(`/Modules/inventory/ProductDetails/${cat.id}` as any)}>
                                    <View style={[styles.catIconWrap, styles.shadow]}>
                                        <Image source={{ uri: cat.image }} style={styles.catImg} />
                                    </View>
                                    <Text style={styles.catLabel}>{cat.name.split(' ')[0]}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {/* BEST SELLERS GRID */}
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Best Sellers</Text>
                            <TouchableOpacity><Text style={styles.seeAll}>View All</Text></TouchableOpacity>
                        </View>
                        <View style={styles.gridClean}>
                            {data?.data?.map((item: any) => (
                                <TouchableOpacity
                                    key={item.id}
                                    activeOpacity={0.9}
                                    style={styles.modernCard}
                                    onPress={() => router.push(`/Modules/inventory/ProductDetails/${item._id}` as any)}
                                >
                                    {/* Image */}
                                    <View style={styles.imgWrap}>
                                        <Image source={{ uri: item.imageUrl }} style={styles.modernImg} />
                                    </View>

                                    {/* Name */}
                                    <Text numberOfLines={2} style={styles.modernTitle}>
                                        {item.name}
                                    </Text>

                                    {/* Price + Cart */}
                                    <View style={styles.cardBottom}>
                                        <Text style={styles.modernPrice}>₹ {item.mrp}</Text>

                                        <TouchableOpacity
                                            style={styles.cartBtn}
                                            onPress={() => handleAddToCart(item)}
                                        >
                                            <Ionicons name="add" size={18} color="#fff" />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>


                    </ScrollView>
                </KeyboardAvoidingView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
    },
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 24, alignItems: 'center' },
    userRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
    avatarWrap: { borderWidth: 2, borderColor: '#FFF', borderRadius: 16, elevation: 3 },
    avatar: { width: 48, height: 48, borderRadius: 14 },
    greeting: { fontFamily: Fonts.medium, fontSize: 12, color: '#999' },
    userName: { fontFamily: Fonts.bold, fontSize: 16 },
    notifyBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', elevation: 2 },
    cartBadge: { position: 'absolute', top: -4, right: -4, backgroundColor: '#FF4B4B', borderRadius: 10, width: 18, height: 18, justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: '#fff' },
    cartBadgeText: { color: '#fff', fontSize: 10, fontFamily: Fonts.bold },
    searchRow: { flexDirection: 'row', paddingHorizontal: 24, gap: 12 },
    searchBox: { flex: 1, flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, paddingHorizontal: 16, alignItems: 'center', height: 52, elevation: 1 },
    searchInput: { marginLeft: 10, flex: 1, fontFamily: Fonts.medium, fontSize: 13 },
    filterBtn: { width: 52, height: 52, backgroundColor: '#00A300', borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
    promoWrap: { paddingHorizontal: 24, marginTop: 20 },
    promoCard: { borderRadius: 24, padding: 20, flexDirection: 'row', overflow: 'hidden', height: 165 },
    promoLabel: { backgroundColor: 'rgba(255,255,255,0.25)', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    promoBadge: { fontFamily: Fonts.bold, color: '#fff', fontSize: 10 },
    promoTitle: { fontFamily: Fonts.bold, color: '#fff', fontSize: 24, marginTop: 10 },
    promoSub: { fontFamily: Fonts.medium, color: '#fff', fontSize: 12, opacity: 0.9 },
    shopNowBtn: { backgroundColor: '#fff', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 12, marginTop: 15, alignSelf: 'flex-start' },
    shopNowText: { color: '#00A300', fontFamily: Fonts.bold, fontSize: 12 },
    promoImg: { width: 120, height: 120, transform: [{ rotate: '-5deg' }] },
    paginationRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 12, gap: 6 },
    pagDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#DDD' },
    pagDotActive: { width: 20, backgroundColor: '#00A300' },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, marginTop: 25, alignItems: 'center' },
    sectionTitle: { fontFamily: Fonts.bold, fontSize: 18, color: '#1a1a1a' },
    seeAll: { fontFamily: Fonts.bold, color: '#00A300', fontSize: 13 },
    catScroll: { paddingLeft: 24, paddingRight: 12, marginTop: 15, gap: 15 },
    catItem: { alignItems: 'center', gap: 8 },
    catIconWrap: { width: 72, height: 72, borderRadius: 22, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
    catImg: { width: '80%', height: '80%', resizeMode: 'contain' },
    catLabel: { fontFamily: Fonts.bold, fontSize: 11, color: '#555' },

    listContainer: { paddingHorizontal: 20, marginTop: 10 },
    gridClean: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10,
    },

    modernCard: {
        width: (width - 60) / 2,
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        padding: 12,
        marginBottom: 18,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
    },

    imgWrap: {
        backgroundColor: '#F8FAFC',   // soft neutral bg (not blue)
        borderRadius: 16,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modernImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },

    modernTitle: {
        marginTop: 10,
        fontFamily: Fonts.bold,
        fontSize: 13,
        color: '#0f172a',
        lineHeight: 18,
    },

    cardBottom: {
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    modernPrice: {
        fontFamily: Fonts.bold,
        fontSize: 15,
        color: '#00A300',   // your theme green
    },

    cartBtn: {
        width: 34,
        height: 34,
        borderRadius: 12,
        backgroundColor: '#00A300',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },

    shadow: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.06, shadowRadius: 12, elevation: 4 },
});
