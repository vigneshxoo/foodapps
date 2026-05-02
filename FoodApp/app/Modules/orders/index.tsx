import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Fonts } from '@/constants/Fonts';

export default function CompactOrders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatus, setActiveStatus] = useState('Pending');
  const tabs = ['Pending', 'Approved', 'Delivered'];

  const getTheme = (status: string) => {
    switch (status) {
      case 'Pending': return { bg: '#FEF3C7', dot: '#F59E0B', text: '#B45309' };
      case 'Approved': return { bg: '#E0F2FE', dot: '#0284C7', text: '#0369A1' };
      case 'Delivered': return { bg: '#DCFCE7', dot: '#10B981', text: '#15803D' };
      default: return { bg: '#F1F5F9', dot: '#94A3B8', text: '#64748B' };
    }
  };

  const theme = getTheme(activeStatus);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Feather name="search" size={16} color="#94A3B8" />
          <TextInput 
            placeholder="Search sales orders..." 
            style={styles.searchFit} 
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.dateFilterRow}>
          <TouchableOpacity style={styles.dateChip}>
            <Text style={styles.dateLabel}>FROM</Text>
            <Text style={styles.dateText}>01 Feb</Text>
            <Feather name="calendar" size={12} color="#00A300" />
          </TouchableOpacity>
          <Feather name="arrow-right" size={14} color="#CBD5E1" />
          <TouchableOpacity style={styles.dateChip}>
            <Text style={styles.dateLabel}>TO</Text>
            <Text style={styles.dateText}>05 Feb</Text>
            <Feather name="calendar" size={12} color="#00A300" />
          </TouchableOpacity>
        </View>

        {/* SUMMARY STATS */}
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

        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity 
                key={tab} 
                style={[styles.tab, activeStatus === tab && styles.activeTab]} 
                onPress={() => setActiveStatus(tab)}
            >
              <Text style={[styles.tabText, activeStatus === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.listArea} showsVerticalScrollIndicator={false}>
        {[101, 102, 103, 104].map((id) => (
          <View key={id} style={styles.slimCard}>
            <View style={styles.row}>
              <Text style={styles.orderId}>#ORD-{id}</Text>
              <View style={[styles.statusPill, { backgroundColor: theme.bg }]}>
                <View style={[styles.dot, { backgroundColor: theme.dot }]} />
                <Text style={[styles.statusTxt, { color: theme.text }]}>{activeStatus.toUpperCase()}</Text>
              </View>
            </View>

            <View style={styles.infoGrid}>
              <View style={styles.infoCol}><Text style={styles.cap}>STORE</Text><Text style={styles.val}>Ramani Store</Text></View>
              <View style={styles.infoCol}><Text style={styles.cap}>DISTRIBUTOR</Text><Text style={styles.val}>Vignesh</Text></View>
            </View>

            <View style={styles.detailsRow}>
              <View style={styles.detailBox}><Text style={styles.cap}>ITEMS</Text><Text style={styles.valSmall}>12 Units</Text></View>
              <View style={[styles.detailBox, { alignItems: 'flex-end' }]}><Text style={styles.capRed}>OUTSTANDING</Text><Text style={styles.debtValue}>₹1,250</Text></View>
            </View>

            <View style={styles.footer}>
              <Text style={styles.totalText}>Total: <Text style={styles.totalBold}>₹4,500</Text></Text>
              <TouchableOpacity style={styles.actionBtn}><Text style={styles.actionBtnText}>VIEW</Text></TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9FC' },
  header: { backgroundColor: '#FFF', padding: 16, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, elevation: 5 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: 14, paddingHorizontal: 14, height: 44, marginBottom: 12 },
  searchFit: { flex: 1, marginLeft: 8, fontSize: 14, fontFamily: Fonts.bold },
  dateFilterRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15 },
  dateChip: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E5E7EB', padding: 8, borderRadius: 12 },
  dateLabel: { fontSize: 9, color: '#94A3B8', fontFamily: Fonts.bold },
  dateText: { fontSize: 12, color: '#0f172a', fontFamily: Fonts.bold },
  summaryRow: { flexDirection: 'row', backgroundColor: '#F8FAFC', borderRadius: 14, padding: 12, marginBottom: 15, borderWidth: 1, borderColor: '#F1F5F9' },
  statBox: { flex: 1, alignItems: 'center' },
  statLabel: { fontSize: 8, fontFamily: Fonts.bold, color: '#94A3B8', marginBottom: 2 },
  statValue: { fontSize: 16, fontFamily: Fonts.bold, color: '#1E293B' },
  tabContainer: { flexDirection: 'row', backgroundColor: '#F1F5F9', borderRadius: 12, padding: 4 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10 },
  activeTab: { backgroundColor: '#00A300' },
  tabText: { fontSize: 11, fontFamily: Fonts.bold, color: '#64748B' },
  activeTabText: { color: '#FFF' },
  listArea: { padding: 14, paddingBottom: 100 },
  slimCard: { backgroundColor: '#FFF', borderRadius: 22, padding: 16, marginBottom: 14, elevation: 3, borderWidth: 1, borderColor: '#F1F5F9' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  orderId: { fontSize: 11, color: '#94A3B8', fontFamily: Fonts.bold },
  statusPill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
  statusTxt: { fontSize: 9, fontFamily: Fonts.bold },
  infoGrid: { flexDirection: 'row', gap: 15, marginBottom: 12 },
  infoCol: { flex: 1 },
  cap: { fontSize: 9, color: '#CBD5E1', fontFamily: Fonts.bold },
  val: { fontSize: 14, color: '#1E293B', fontFamily: Fonts.bold },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#F8FAFC', padding: 12, borderRadius: 14, marginBottom: 12 },
  detailBox: { flex: 1 },
  valSmall: { fontSize: 12, color: '#475569', fontFamily: Fonts.bold },
  capRed: { fontSize: 9, color: '#F87171', fontFamily: Fonts.bold },
  debtValue: { fontSize: 13, color: '#DC2626', fontFamily: Fonts.bold },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 12 },
  totalText: { fontSize: 11, color: '#94A3B8', fontFamily: Fonts.bold },
  totalBold: { fontSize: 18, color: '#1A1A1A', fontFamily: Fonts.bold },
  actionBtn: { backgroundColor: '#00A300', paddingHorizontal: 18, paddingVertical: 8, borderRadius: 10 },
  actionBtnText: { color: '#FFF', fontSize: 11, fontFamily: Fonts.bold }
});