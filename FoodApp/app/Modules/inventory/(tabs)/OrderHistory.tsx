import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@/constants/Fonts';
import { useRouter } from 'expo-router';
import { ORDERS } from '@/constants/Orders';
import { Stack } from 'expo-router';

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Pending': return '#FF9800';
        case 'Approved': return '#4CAF50';
        case 'Delivered': return '#2196F3';
        case 'Cancelled': return '#F44336';
        default: return '#999';
    }
};

export default function InventoryOrderHistory() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <Stack screenOptions={{ headerShown: false }}></Stack>

            <View style={styles.header}>
                <Text style={styles.title}>Order History</Text>
                <TouchableOpacity style={styles.filterBtn}>
                    <Feather name="filter" size={20} color="#00A300" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {ORDERS.map((order) => (
                    <TouchableOpacity
                        key={order.id}
                        style={[styles.orderCard, styles.shadow]}
                        onPress={() => router.push(`/Modules/inventory/OrderDetails/${order.id.replace('#', '')}` as any)}
                    >
                        <View style={styles.orderTop}>
                            <View>
                                <Text style={styles.orderId}>{order.id}</Text>
                                <Text style={styles.orderDate}>{order.date}</Text>
                            </View>
                            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '15' }]}>
                                <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>{order.status}</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.orderBottom}>
                            <View style={styles.infoRow}>
                                <MaterialCommunityIcons name="package-variant" size={18} color="#999" />
                                <Text style={styles.infoLabel}>{order.items.reduce((acc, item) => acc + item.quantity, 0)} Items</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.totalLabel}>Total: </Text>
                                <Text style={styles.totalValue}>{order.total}</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.reorderBtn}
                            onPress={() => router.push(`/Modules/inventory/OrderDetails/${order.id.replace('#', '')}` as any)}
                        >
                            <Text style={styles.reorderText}>View Details</Text>
                            <Feather name="chevron-right" size={16} color="#00A300" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 20
    },
    title: { fontSize: 24, fontFamily: Fonts.bold, color: '#1a1a1a' },
    filterBtn: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#F0F0F0'
    },
    scrollContent: { paddingHorizontal: 24, paddingBottom: 100 },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F0F0F0'
    },
    orderTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    orderId: { fontFamily: Fonts.bold, fontSize: 16, color: '#1a1a1a' },
    orderDate: { fontFamily: Fonts.medium, fontSize: 13, color: '#999', marginTop: 2 },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
    },
    statusText: { fontFamily: Fonts.bold, fontSize: 12 },
    divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 16 },
    orderBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    infoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    infoLabel: { fontFamily: Fonts.medium, fontSize: 14, color: '#666' },
    totalLabel: { fontFamily: Fonts.medium, fontSize: 14, color: '#666' },
    totalValue: { fontFamily: Fonts.bold, fontSize: 16, color: '#00A300' },
    reorderBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#F8F9FA',
        gap: 4
    },
    reorderText: { fontFamily: Fonts.bold, fontSize: 13, color: '#00A300' },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 3
    },
});