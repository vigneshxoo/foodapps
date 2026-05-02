import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Fonts } from '@/constants/Fonts';

const { width } = Dimensions.get('window');

export default function RetailerOrders() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeStatus, setActiveStatus] = useState('Pending'); // Default State

    const tabs = ['Pending', 'Approved', 'Delivered'];

    return (
        <SafeAreaView style={styles.container}>
            {/* --- MASTER HEADER (Search + Date + Filters) --- */}
            <View style={styles.headerContainer}>
                {/* 1. Search Bar */}
                <View style={styles.searchRow}>
                    <View style={styles.searchBar}>
                        <Feather name="search" size={18} color="#94A3B8" />
                        <TextInput
                            placeholder="Search Retailer Orders..."
                            style={styles.searchInput}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholderTextColor="#94A3B8"
                        />
                    </View>
                </View>

                {/* 2. Date Range */}
                <View style={styles.dateFilterRow}>
                    <TouchableOpacity style={styles.dateField}>
                        <Text style={styles.dateLabel}>FROM</Text>
                        <Text style={styles.dateVal}>01 Feb 2026</Text>
                        <Feather name="calendar" size={12} color="#00A300" />
                    </TouchableOpacity>

                    <View style={styles.arrowBox}>
                        <Feather name="arrow-right" size={14} color="#CBD5E1" />
                    </View>

                    <TouchableOpacity style={styles.dateField}>
                        <Text style={styles.dateLabel}>TO</Text>
                        <Text style={styles.dateVal}>05 Feb 2026</Text>
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
                {/* 3. NEW STATUS FILTERS */}
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

            {/* --- CONTENT LIST --- */}
            <ScrollView
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Example Card 1 */}
                <View style={styles.retailCard}>
                    <View style={styles.cardHeader}>
                        <View>
                            <Text style={styles.idText}>RET-ORDER #221</Text>
                            <Text style={styles.placedDate}>Placed on: 04 Feb, 2026</Text>
                        </View>
                        {/* Status Pill matches the Filter Logic */}
                        <View style={styles.statusPill}>
                            <Text style={styles.statusText}>{activeStatus.toUpperCase()}</Text>
                        </View>
                    </View>

                    <View style={styles.detailsGrid}>
                        <View style={styles.detailBlock}>
                            <Text style={styles.cap}>SHOP NAME</Text>
                            <Text style={styles.mainVal}>Ramani Store</Text>
                        </View>
                        <View style={[styles.detailBlock, { alignItems: 'flex-end' }]}>
                            <Text style={styles.cap}>ORDER PLACED TO</Text>
                            <Text style={styles.agencyVal}>Sakthi Agencies, Madurai</Text>
                        </View>
                    </View>

                    <View style={styles.infoStrip}>
                        <View style={styles.stripItem}>
                            <Text style={styles.stripCap}>ITEMS</Text>
                            <Text style={styles.stripVal}>08 SKUs</Text>
                        </View>
                        <View style={styles.stripItem}>
                            <Text style={styles.stripCap}>EXP. DELIVERY</Text>
                            <Text style={styles.stripVal}>08 Feb '26</Text>
                        </View>
                    </View>

                    <View style={styles.cardFooter}>
                        <View>
                            <Text style={styles.cap}>TOTAL BILL AMOUNT</Text>
                            <Text style={styles.amount}>₹12,840.50</Text>
                        </View>
                        <TouchableOpacity style={styles.detailsBtn}>
                            <Text style={styles.detailsBtnText}>View Items</Text>
                            <Feather name="eye" size={14} color="#FFF" style={{ marginLeft: 6 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FAFB' },

    // --- HEADER STYLES ---
    headerContainer: {
        backgroundColor: '#FFF',
        padding: 16,
        paddingBottom: 20, // Extra padding for tabs
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 5
    },
    searchRow: { marginBottom: 15 },
    searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 14, paddingHorizontal: 12, height: 46 },
    searchInput: { flex: 1, marginLeft: 10, fontSize: 14, fontFamily: Fonts.bold, color: '#1E293B' },

    dateFilterRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
    dateField: { flex: 1, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    dateLabel: { fontSize: 8, fontFamily: Fonts.bold, color: '#94A3B8' },
    dateVal: { fontSize: 11, fontFamily: Fonts.bold, color: '#1E293B' },
    arrowBox: { paddingHorizontal: 8 },

    // --- NEW TAB FILTERS ---
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#F1F5F9',
        borderRadius: 14,
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
        backgroundColor: '#00A300', // Premium Green for Active
        shadowColor: '#00A300',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2
    },
    tabText: {
        fontSize: 11,
        fontFamily: Fonts.bold,
        color: '#64748B' // Inactive Text
    },
    activeTabText: {
        color: '#FFF' // Active Text
    },

    // --- CARD STYLES ---
    listContainer: { padding: 16, paddingBottom: 110 },
    retailCard: {
        backgroundColor: '#FFF',
        borderRadius: 22,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F1F5F9'
    },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 },
    idText: { fontSize: 11, fontFamily: Fonts.bold, color: '#94A3B8', letterSpacing: 0.5 },
    placedDate: { fontSize: 13, fontFamily: Fonts.bold, color: '#1E293B', marginTop: 2 },

    // Status Pill Design
    statusPill: { backgroundColor: '#F0FDF4', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, borderWidth: 1, borderColor: '#DCFCE7' },
    statusText: { fontSize: 9, fontFamily: Fonts.bold, color: '#166534' },

    detailsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
    detailBlock: { flex: 1 },
    cap: { fontSize: 9, fontFamily: Fonts.bold, color: '#CBD5E1', marginBottom: 4 },
    mainVal: { fontSize: 15, fontFamily: Fonts.bold, color: '#334155' },
    agencyVal: { fontSize: 13, fontFamily: Fonts.bold, color: '#00A300', textAlign: 'right' },

    infoStrip: { flexDirection: 'row', backgroundColor: '#F8FAFC', padding: 12, borderRadius: 12, marginBottom: 18, gap: 20 },
    stripItem: { flex: 1 },
    stripCap: { fontSize: 7, fontFamily: Fonts.bold, color: '#94A3B8', marginBottom: 2 },
    stripVal: { fontSize: 12, fontFamily: Fonts.bold, color: '#475569' },

    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 15 },
    amount: { fontSize: 20, fontFamily: Fonts.bold, color: '#1A1A1A' },
    detailsBtn: {
        backgroundColor: '#00A300',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        shadowColor: '#00A300',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4
    },
    detailsBtnText: { color: '#FFF', fontSize: 11, fontFamily: Fonts.bold },
    summaryRow: { flexDirection: 'row', backgroundColor: '#F8FAFC', borderRadius: 14, padding: 12, marginBottom: 15, borderWidth: 1, borderColor: '#F1F5F9' },
    statBox: { flex: 1, alignItems: 'center' },
    statLabel: { fontSize: 8, fontFamily: Fonts.bold, color: '#94A3B8', marginBottom: 2 },
    statValue: { fontSize: 16, fontFamily: Fonts.bold, color: '#1E293B' },
});