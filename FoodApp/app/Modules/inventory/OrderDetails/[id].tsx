import React, { useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Dimensions,
    Alert
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ORDERS } from '@/constants/Orders';
import { Fonts } from '@/constants/Fonts';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Stack } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts } from '@/app/API/ProductApi';

const { width } = Dimensions.get('window');

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Pending': return '#FF9800';
        case 'Approved': return '#4CAF50';
        case 'Delivered': return '#2196F3';
        case 'Cancelled': return '#F44336';
        default: return '#999';
    }
};

export default function OrderDetails() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const order = useMemo(() => {
        return ORDERS.find(o => o.id.replace('#', '') === id);
    }, [id]);


   

    // usage


    if (!order) {
        return (
            <SafeAreaView style={styles.errorContainer}>
                <Feather name="search" size={50} color="#CCC" />
                <Text style={styles.errorText}>Order not found</Text>
                <TouchableOpacity onPress={() => router.back()} style={styles.errorButton}>
                    <Text style={styles.backLink}>Go Back to Orders</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);

    const generatePDF = async () => {
        const html = `
        <html>
          <head>
            <style>
              body { font-family: 'Helvetica'; padding: 40px; color: #333; line-height: 1.6; }
              .header { display: flex; justify-content: space-between; border-bottom: 2px solid #00A300; padding-bottom: 20px; }
              .brand { color: #00A300; font-size: 28px; font-weight: bold; }
              .invoice-label { text-align: right; }
              .details-section { display: flex; justify-content: space-between; margin: 40px 0; }
              .box { background: #f8f9fa; padding: 15px; border-radius: 10px; width: 45%; }
              table { width: 100%; border-collapse: collapse; margin: 30px 0; }
              th { background-color: #00A300; color: white; text-align: left; padding: 12px; }
              td { padding: 12px; border-bottom: 1px solid #eee; }
              .summary { margin-left: auto; width: 300px; margin-top: 20px; }
              .summary-row { display: flex; justify-content: space-between; padding: 8px 0; }
              .grand-total { border-top: 2px solid #333; padding-top: 10px; font-size: 20px; font-weight: bold; color: #00A300; }
              .footer { text-align: center; margin-top: 60px; font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 20px; }
            </style>
          </head>
          <body>
            <div class="header">
              <div>
                <div class="brand">POWER SOAPS</div>
                <p>Organic & Fresh Distributor Network</p>
              </div>
              <div class="invoice-label">
                <h1>INVOICE</h1>
                <p><strong>Order ID:</strong> ${order.id}</p>
                <p><strong>Date:</strong> ${order.date}</p>
              </div>
            </div>

            <div class="details-section">
              <div class="box">
                <strong>Shipping Address:</strong><br/>
                Vignesh Kumar<br/>
                123, Green Street, Organic Colony<br/>
                Chennai - 600001
              </div>
              <div class="box">
                <strong>Order Status:</strong><br/>
                <span style="color: ${getStatusColor(order.status)}">${order.status}</span><br/>
                <strong>Payment:</strong> Prepaid
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Product Description</th>
                  <th>Weight</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map(item => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.weight}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div class="summary">
              <div class="summary-row"><span>Subtotal</span> <span>${order.subtotal}</span></div>
              <div class="summary-row"><span>Delivery Fee</span> <span>${order.deliveryFee}</span></div>
              <div class="summary-row"><span>GST (Tax)</span> <span>${order.tax}</span></div>
              <div class="summary-row grand-total"><span>Total Amount</span> <span>${order.total}</span></div>
            </div>

            <div class="footer">
              <p>Thank you for your business!</p>
              <p>For any queries, contact support@powersoaps.com</p>
            </div>
          </body>
        </html>
        `;

        try {
            const { uri } = await Print.printToFileAsync({ html });
            await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
        } catch (error) {
            Alert.alert("Error", "Could not generate PDF");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                    <Feather name="chevron-left" size={24} color="#1a1a1a" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Order #{id}</Text>
                <TouchableOpacity style={styles.downloadBtn} onPress={generatePDF}>
                    <Feather name="share-2" size={20} color="#00A300" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* TRACKER COMPONENT */}
                <View style={styles.trackerWrapper}>
                    <View style={styles.trackerRow}>
                        <View style={[styles.dot, { backgroundColor: '#00A300' }]} />
                        <View style={[styles.line, { backgroundColor: order.status !== 'Pending' ? '#00A300' : '#EEE' }]} />
                        <View style={[styles.dot, { backgroundColor: order.status !== 'Pending' ? '#00A300' : '#EEE' }]} />
                        <View style={[styles.line, { backgroundColor: order.status === 'Delivered' ? '#00A300' : '#EEE' }]} />
                        <View style={[styles.dot, { backgroundColor: order.status === 'Delivered' ? '#00A300' : '#EEE' }]} />
                    </View>
                    <View style={styles.trackerLabels}>
                        <Text style={styles.activeLabel}>Placed</Text>
                        <Text style={order.status !== 'Pending' ? styles.activeLabel : styles.inactiveLabel}>Approved</Text>
                        <Text style={order.status === 'Delivered' ? styles.activeLabel : styles.inactiveLabel}>Delivered</Text>
                    </View>
                </View>

                {/* ORDER INFO */}
                <View style={styles.statusCard}>
                    <View style={styles.statusInfo}>
                        <Text style={styles.orderIdText}>{order.id}</Text>
                        <Text style={styles.dateText}>Placed on {order.date}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '15' }]}>
                        <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>{order.status}</Text>
                    </View>
                </View>

                {/* ITEMS SECTION */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Ordered Items</Text>
                        <View style={styles.itemCountBadge}>
                            <Text style={styles.itemCountText}>{totalQuantity} Items</Text>
                        </View>
                    </View>

                    {order.items.map((item) => (
                        <View key={item.id} style={styles.itemRow}>
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: item.image }} style={styles.itemImage} />
                            </View>
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemMeta}>{item.weight} • {item.quantity} Qty</Text>
                            </View>
                            <Text style={styles.itemPrice}>{item.price}</Text>
                        </View>
                    ))}
                </View>

                {/* SUMMARY SECTION */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Bill Details</Text>
                    <View style={styles.summaryContainer}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Items Total</Text>
                            <Text style={styles.summaryValue}>{order.subtotal}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Delivery Charge</Text>
                            <Text style={styles.summaryValue}>{order.deliveryFee}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Tax & GST</Text>
                            <Text style={styles.summaryValue}>{order.tax}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Grand Total</Text>
                            <Text style={styles.totalValue}>{order.total}</Text>
                        </View>
                    </View>
                </View>

                {/* SHIPPING INFO */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Delivery Location</Text>
                    <View style={styles.shippingCard}>
                        <View style={styles.iconCircle}>
                            <MaterialCommunityIcons name="map-marker" size={22} color="#00A300" />
                        </View>
                        <View style={styles.shippingDetails}>
                            <Text style={styles.shippingName}>Vignesh Kumar</Text>
                            <Text style={styles.shippingAddress}>123, Green Street, Organic Colony, Chennai - 600001</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.pdfButton} onPress={generatePDF}>
                    <Ionicons name="receipt-outline" size={20} color="#fff" />
                    <Text style={styles.pdfButtonText}>Download Invoice</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.reorderBtn} onPress={() => Alert.alert("Coming Soon", "Re-order logic pending cart integration.")}>
                    <Text style={styles.reorderText}>Re-order Items</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FBFBFB', paddingTop: 30 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F8F9FA', alignItems: 'center', justifyContent: 'center' },
    headerTitle: { fontFamily: Fonts.bold, fontSize: 16, color: '#1a1a1a' },
    downloadBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#E6F6E6', alignItems: 'center', justifyContent: 'center' },
    scrollContent: { padding: 20, paddingBottom: 40 },

    // Tracker Styles
    trackerWrapper: { marginBottom: 30, paddingHorizontal: 10 },
    trackerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    dot: { width: 12, height: 12, borderRadius: 6 },
    line: { flex: 1, height: 2, marginHorizontal: 4 },
    trackerLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
    activeLabel: { fontFamily: Fonts.bold, fontSize: 10, color: '#00A300' },
    inactiveLabel: { fontFamily: Fonts.medium, fontSize: 10, color: '#CCC' },

    statusCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    statusInfo: { gap: 4 },
    orderIdText: { fontFamily: Fonts.bold, fontSize: 18, color: '#1a1a1a' },
    dateText: { fontFamily: Fonts.medium, fontSize: 12, color: '#999' },
    statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
    statusText: { fontFamily: Fonts.bold, fontSize: 12 },

    section: { marginBottom: 25 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 },
    sectionTitle: { fontFamily: Fonts.bold, fontSize: 16, color: '#1a1a1a' },
    itemCountBadge: { backgroundColor: '#F0F0F0', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    itemCountText: { fontFamily: Fonts.bold, fontSize: 11, color: '#666' },

    itemRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 20, marginBottom: 10, borderWidth: 1, borderColor: '#F5F5F5' },
    imageContainer: { width: 50, height: 50, borderRadius: 12, backgroundColor: '#F9F9F9', alignItems: 'center', justifyContent: 'center' },
    itemImage: { width: 40, height: 40, resizeMode: 'contain' },
    itemDetails: { flex: 1, marginLeft: 15 },
    itemName: { fontFamily: Fonts.bold, fontSize: 14, color: '#1a1a1a' },
    itemMeta: { fontFamily: Fonts.medium, fontSize: 12, color: '#999', marginTop: 2 },
    itemPrice: { fontFamily: Fonts.bold, fontSize: 14, color: '#1a1a1a' },

    summaryContainer: { backgroundColor: '#fff', padding: 20, borderRadius: 24, gap: 12, borderWidth: 1, borderColor: '#F0F0F0' },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
    summaryLabel: { fontFamily: Fonts.medium, fontSize: 14, color: '#999' },
    summaryValue: { fontFamily: Fonts.bold, fontSize: 14, color: '#1a1a1a' },
    divider: { height: 1, backgroundColor: '#F5F5F5', marginVertical: 4 },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    totalLabel: { fontFamily: Fonts.bold, fontSize: 15, color: '#1a1a1a' },
    totalValue: { fontFamily: Fonts.bold, fontSize: 22, color: '#00A300' },

    shippingCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 18, borderRadius: 24, gap: 15, borderWidth: 1, borderColor: '#F0F0F0' },
    iconCircle: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#E6F6E6', alignItems: 'center', justifyContent: 'center' },
    shippingDetails: { flex: 1, gap: 2 },
    shippingName: { fontFamily: Fonts.bold, fontSize: 15, color: '#1a1a1a' },
    shippingAddress: { fontFamily: Fonts.medium, fontSize: 12, color: '#777', lineHeight: 18 },

    pdfButton: { backgroundColor: '#00A300', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 16, borderRadius: 18, marginTop: 10 },
    pdfButtonText: { color: '#fff', fontFamily: Fonts.bold, fontSize: 15 },
    reorderBtn: { alignItems: 'center', padding: 16, marginTop: 10 },
    reorderText: { color: '#00A300', fontFamily: Fonts.bold, fontSize: 14 },

    errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 15 },
    errorText: { fontFamily: Fonts.bold, fontSize: 16, color: '#1a1a1a' },
    errorButton: { padding: 10 },
    backLink: { fontFamily: Fonts.bold, color: '#00A300' },
});