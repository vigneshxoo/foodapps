import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@/constants/Fonts';

export default function RetailerRequests() {
  const [activeTab, setActiveTab] = useState('Pending');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { label: 'All', count: 42 },
    { label: 'Pending', count: 12 },
    { label: 'Approved', count: 25 },
    { label: 'Rejected', count: 5 },
  ];

  // Mock Data
  const requests = [
    {
      id: 'REQ-9921',
      name: 'Sri Krishna Medicals',
      type: 'Medical Shop',
      contactPerson: 'Murali Krishna',
      mobile: '+91 98400 55667',
      license: 'LIC-MED-2024-X8',
      date: '05 Feb 2026',
      status: 'Pending'
    },
    {
        id: 'REQ-9922',
        name: 'Velan Traders',
        type: 'Wholesale Shop',
        contactPerson: 'Velu Mani',
        mobile: '+91 94440 11223',
        license: 'LIC-WS-8821',
        date: '04 Feb 2026',
        status: 'Pending'
      }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return { bg: '#DCFCE7', text: '#15803D' };
      case 'Rejected': return { bg: '#FEE2E2', text: '#B91C1C' };
      default: return { bg: '#FEF3C7', text: '#B45309' }; // Pending
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER SECTION */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Retailer Requests</Text>
        
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Feather name="search" size={18} color="#94A3B8" />
          <TextInput 
            placeholder="Search request or store name..." 
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#94A3B8"
          />
        </View>

        {/* 4-STATE STATUS BAR */}
        <View style={styles.tabWrapper}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
                {tabs.map((tab) => (
                    <TouchableOpacity 
                        key={tab.label} 
                        style={[styles.tab, activeTab === tab.label && styles.activeTab]}
                        onPress={() => setActiveTab(tab.label)}
                    >
                        <Text style={[styles.tabText, activeTab === tab.label && styles.activeTabText]}>
                            {tab.label}
                        </Text>
                        <View style={[styles.countBadge, activeTab === tab.label ? {backgroundColor: '#FFF'} : {backgroundColor: '#F1F5F9'}]}>
                            <Text style={[styles.countText, activeTab === tab.label && {color: '#00A300'}]}>{tab.count}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
      </View>

      {/* REQUEST LIST */}
      <ScrollView contentContainerStyle={styles.listArea} showsVerticalScrollIndicator={false}>
        {requests.map((req) => (
          <View key={req.id} style={styles.requestCard}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.reqId}>{req.id}</Text>
                <Text style={styles.storeName}>{req.name}</Text>
              </View>
              <View style={[styles.statusPill, { backgroundColor: getStatusColor(req.status).bg }]}>
                <Text style={[styles.statusText, { color: getStatusColor(req.status).text }]}>
                    {req.status.toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                    <MaterialCommunityIcons name="store-outline" size={14} color="#94A3B8" />
                    <Text style={styles.infoVal}>{req.type}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Feather name="user" size={14} color="#94A3B8" />
                    <Text style={styles.infoVal}>{req.contactPerson}</Text>
                </View>
            </View>

            <View style={styles.detailsRow}>
                <View style={styles.detBox}>
                    <Text style={styles.detCap}>MOBILE</Text>
                    <Text style={styles.detVal}>{req.mobile}</Text>
                </View>
                <View style={styles.detBox}>
                    <Text style={styles.detCap}>LICENSE NO</Text>
                    <Text style={styles.detVal}>{req.license}</Text>
                </View>
                <View style={[styles.detBox, { borderRightWidth: 0 }]}>
                    <Text style={styles.detCap}>REQUESTED</Text>
                    <Text style={styles.detVal}>{req.date}</Text>
                </View>
            </View>

            {/* ACTION BUTTONS (Only show for Pending) */}
            {req.status === 'Pending' && (
                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.rejectBtn}>
                        <Feather name="x-circle" size={14} color="#DC2626" />
                        <Text style={styles.rejectText}>Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.approveBtn}>
                        <Feather name="check-circle" size={14} color="#FFF" />
                        <Text style={styles.approveText}>Approve Request</Text>
                    </TouchableOpacity>
                </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { backgroundColor: '#FFF', padding: 16, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, elevation: 4 },
  headerTitle: { fontSize: 20, fontFamily: Fonts.bold, color: '#1E293B', marginBottom: 15 },
  
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', borderRadius: 12, paddingHorizontal: 12, height: 46, marginBottom: 18 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 14, fontFamily: Fonts.medium, color: '#1E293B' },

  tabWrapper: { marginHorizontal: -16 },
  tabScroll: { paddingHorizontal: 16, gap: 10 },
  tab: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  activeTab: { backgroundColor: '#00A300', borderColor: '#00A300' },
  tabText: { fontSize: 13, fontFamily: Fonts.bold, color: '#64748B' },
  activeTabText: { color: '#FFF' },
  countBadge: { marginLeft: 8, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  countText: { fontSize: 10, fontFamily: Fonts.bold, color: '#64748B' },

  listArea: { padding: 16, paddingBottom: 100 },
  requestCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 16, marginBottom: 16, elevation: 2, borderWidth: 1, borderColor: '#F1F5F9' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 },
  reqId: { fontSize: 10, fontFamily: Fonts.bold, color: '#94A3B8' },
  storeName: { fontSize: 17, fontFamily: Fonts.bold, color: '#1E293B' },
  statusPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 9, fontFamily: Fonts.bold },

  infoGrid: { flexDirection: 'row', gap: 20, marginBottom: 15 },
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  infoVal: { fontSize: 12, color: '#475569', fontFamily: Fonts.medium },

  detailsRow: { flexDirection: 'row', backgroundColor: '#F8FAFC', borderRadius: 12, padding: 12, marginBottom: 18 },
  detBox: { flex: 1, borderRightWidth: 1, borderRightColor: '#E2E8F0', paddingHorizontal: 5 },
  detCap: { fontSize: 8, fontFamily: Fonts.bold, color: '#94A3B8', marginBottom: 4 },
  detVal: { fontSize: 10, fontFamily: Fonts.bold, color: '#334155' },

  actionRow: { flexDirection: 'row', gap: 10, borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 15 },
  rejectBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: '#FEE2E2' },
  rejectText: { color: '#DC2626', fontSize: 13, fontFamily: Fonts.bold },
  approveBtn: { flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 10, borderRadius: 10, backgroundColor: '#00A300' },
  approveText: { color: '#FFF', fontSize: 13, fontFamily: Fonts.bold }
});