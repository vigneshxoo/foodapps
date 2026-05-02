import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Fonts } from '@/constants/Fonts';

const { width } = Dimensions.get('window');

export default function VanOrders() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeStatus, setActiveStatus] = useState('Pending'); // Default Tab

    const tabs = ['Pending', 'Approved', 'Delivered'];

    // Helper to get colors based on status (Visual feedback)
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending': return { bg: '#FFF7ED', text: '#EA580C', dot: '#EA580C' }; // Orange
            case 'Approved': return { bg: '#E0F2FE', text: '#0284C7', dot: '#0284C7' }; // Blue
            case 'Delivered': return { bg: '#DCFCE7', text: '#166534', dot: '#166534' }; // Green
            default: return { bg: '#F1F5F9', text: '#64748B', dot: '#64748B' };
        }
    };

    const statusStyle = getStatusColor(activeStatus);

    return (
        <SafeAreaView style={styles.container}>
            {/* --- COMPACT HEADER WITH SEARCH, DATE & TABS --- */}
            <View style={styles.headerContainer}>

                {/* 1. SEARCH ROW */}
                <View style={styles.searchRow}>
                    <View style={styles.searchBar}>
                        <Feather name="search" size={18} color="#94A3B8" />
                        <TextInput
                            placeholder="Search Van Orders..."
                            style={styles.searchInput}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholderTextColor="#94A3B8"
                        />
                    </View>
                    <TouchableOpacity style={styles.filterBtn}>
                        <Ionicons name="options-outline" size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>


                {/* 2. DATE PICKER ROW */}
                <View style={styles.datePickerRow}>
                    <TouchableOpacity style={styles.dateChip}>
                        <Text style={styles.dateLabel}>FROM</Text>
                        <Text style={styles.dateText}>01 Feb 2026</Text>
                        <Feather name="calendar" size={12} color="#00A300" />
                    </TouchableOpacity>

                    <View style={styles.dateArrow}>
                        <Feather name="arrow-right" size={14} color="#CBD5E1" />
                    </View>

                    <TouchableOpacity style={styles.dateChip}>
                        <Text style={styles.dateLabel}>TO</Text>
                        <Text style={styles.dateText}>05 Feb 2026</Text>
                        <Feather name="calendar" size={12} color="#00A300" />
                    </TouchableOpacity>
                </View>
                <View style={styles.summaryRow}>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>TOTAL ORDERS</Text>
                        <Text style={styles.statValue}>124</Text>
                    </View>
                    <View style={[styles.statBox, { borderLeftWidth: 1, borderLeftColor: '#E2E8F0' }]}>
                        <Text style={styles.statLabel}>TOTAL AMOUNT</Text>
                        <Text style={[styles.statValue, { color: '#00A300' }]}>₹45,200</Text>
                    </View>
                </View>

                {/* 3. NEW STATUS TABS */}
                <View style={styles.tabContainer}>
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tab, activeStatus === tab && styles.activeTab]}
                            onPress={() => setActiveStatus(tab)}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.tabText, activeStatus === tab && styles.activeTabText]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* --- LIST CONTENT --- */}
            <ScrollView
                contentContainerStyle={styles.scrollList}
                showsVerticalScrollIndicator={false}
            >
                {[1, 2, 3].map((item) => (
                    <View key={item} style={styles.vanCard}>
                        {/* TOP BAR: ID & TIME */}
                        <View style={styles.cardTop}>
                            <View>
                                <Text style={styles.orderId}>VAN-ORD #882{item}</Text>
                                <Text style={styles.timeText}>Today, 10:45 AM</Text>
                            </View>

                            {/* DYNAMIC STATUS BADGE */}
                            <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                                <View style={[styles.dot, { backgroundColor: statusStyle.dot }]} />
                                <Text style={[styles.statusText, { color: statusStyle.text }]}>
                                    {activeStatus.toUpperCase()}
                                </Text>
                            </View>
                        </View>

                        {/* ENTITY SECTION */}
                        <View style={styles.entityRow}>
                            <View style={styles.entityBox}>
                                <Text style={styles.caption}>STORE NAME</Text>
                                <Text style={styles.value}>Ramani Store</Text>
                            </View>
                            <View style={[styles.entityBox, { alignItems: 'flex-end' }]}>
                                <Text style={styles.caption}>SALESMAN</Text>
                                <Text style={styles.value}>Vignesh K.</Text>
                            </View>
                        </View>

                        {/* LOGISTICS STRIP */}
                        <View style={styles.logisticsStrip}>
                            <View style={styles.logItem}>
                                <Text style={styles.capSmall}>DISTRIBUTOR</Text>
                                <Text style={styles.valSmall}>Supreme Dist.</Text>
                            </View>
                            <View style={styles.logItem}>
                                <Text style={styles.capSmall}>ITEMS</Text>
                                <Text style={styles.valSmall}>24 Units</Text>
                            </View>
                            <View style={[styles.logItem, { borderRightWidth: 0 }]}>
                                <Text style={styles.capSmall}>DELIVERY DATE</Text>
                                <Text style={styles.valSmall}>06 Feb '26</Text>
                            </View>
                        </View>

                        {/* FOOTER */}
                        <View style={styles.cardFooter}>
                            <View>
                                <Text style={styles.caption}>TOTAL AMOUNT</Text>
                                <Text style={styles.priceText}>₹8,450.00</Text>
                            </View>
                            <TouchableOpacity style={styles.updateBtn}>
                                <Text style={styles.updateBtnText}>Track Van</Text>
                                <Feather name="map-pin" size={12} color="#FFF" style={{ marginLeft: 5 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },

    // HEADER STYLES
    headerContainer: {
        backgroundColor: '#FFF',
        padding: 16,
        paddingBottom: 20, // Space for tabs
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5
    },
    searchRow: { flexDirection: 'row', gap: 10, marginBottom: 15 },
    searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', borderRadius: 12, paddingHorizontal: 12, height: 45 },
    searchInput: { flex: 1, marginLeft: 10, fontSize: 14, fontFamily: Fonts.bold, color: '#1E293B' },
    filterBtn: { backgroundColor: '#00A300', width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },

    datePickerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
    dateChip: { flex: 1, backgroundColor: '#FFF', borderColor: '#E2E8F0', borderWidth: 1, borderRadius: 10, padding: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    dateLabel: { fontSize: 7, fontFamily: Fonts.medium, color: '#94A3B8' },
    dateText: { fontSize: 11, fontFamily: Fonts.bold, color: '#334155' },
    dateArrow: { paddingHorizontal: 10 },

    // --- NEW TAB STYLES ---
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#F1F5F9',
        borderRadius: 12,
        padding: 4,
        justifyContent: 'space-between'
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 10
    },
    activeTab: {
        backgroundColor: '#00A300',
        shadowColor: '#00A300',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2
    },
    tabText: {
        fontSize: 11,
        fontFamily: Fonts.bold,
        color: '#64748B'
    },
    activeTabText: {
        color: '#FFF'
    },

    // CARD DESIGN
    scrollList: { padding: 16, paddingBottom: 100 },
    vanCard: {
        backgroundColor: '#FFF',
        borderRadius: 22,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F1F5F9'
    },
    cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 },
    orderId: { fontSize: 12, fontFamily: Fonts.bold, color: '#94A3B8', letterSpacing: 0.5 },
    timeText: { fontSize: 13, fontFamily: Fonts.medium, color: '#1E293B', marginTop: 2 },

    // Status Badge
    statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
    dot: { width: 5, height: 5, borderRadius: 3, marginRight: 6 },
    statusText: { fontSize: 10, fontFamily: Fonts.bold },

    entityRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
    entityBox: { flex: 1 },
    caption: { fontSize: 8, fontFamily: Fonts.bold, color: '#CBD5E1', marginBottom: 3 },
    value: { fontSize: 15, fontFamily: Fonts.medium, color: '#334155' },

    logisticsStrip: { flexDirection: 'row', backgroundColor: '#F8FAFC', padding: 12, borderRadius: 14, marginBottom: 15 },
    logItem: { flex: 1, borderRightWidth: 1, borderRightColor: '#E2E8F0', paddingHorizontal: 5 },
    capSmall: { fontSize: 9, fontFamily: Fonts.bold, color: '#94A3B8', marginBottom: 2 },
    valSmall: { fontSize: 11, fontFamily: Fonts.bold, color: '#475569' },

    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 15 },
    priceText: { fontSize: 20, fontFamily: Fonts.bold, color: '#00A300' },
    updateBtn: { backgroundColor: '#1A1A1A', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 12 },
    updateBtnText: { color: '#FFF', fontSize: 11, fontFamily: Fonts.bold },
    summaryRow: { flexDirection: 'row', backgroundColor: '#F8FAFC', borderRadius: 14, padding: 12, marginBottom: 15, borderWidth: 1, borderColor: '#F1F5F9' },
    statBox: { flex: 1, alignItems: 'center' },
    statLabel: { fontSize: 8, fontFamily: Fonts.bold, color: '#94A3B8', marginBottom: 2 },
    statValue: { fontSize: 16, fontFamily: Fonts.bold, color: '#1E293B' },
    // tabContainer: { flexDirection: 'row', backgroundColor: '#F1F5F9', borderRadius: 12, padding: 4 },
    // tab: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10 },
});