import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Fonts } from '@/constants/Fonts';

export default function OnboardRetailers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('All Streets');

  const retailers = [
    {
      code: 'RET-8821',
      name: 'Abirami Store',
      type: 'Retailer',
      street: 'Kovil Vasal Street',
      mobile: '+91 98450 12345',
      contactPerson: 'Senthil Kumar',
      joined: '10 Jan 2026',
      gst: '33AABCU1234F1Z5',
      paid: '12,500',
      outstanding: '4,200',
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* --- TOP ACTION BAR --- */}
      <View style={styles.topHeader}>
        <View style={styles.statsRow}>
          <View>
            <Text style={styles.statLabel}>TOTAL RETAILERS</Text>
            <Text style={styles.statValue}>1,248 <Text style={styles.subStat}>Shops</Text></Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.goBtn}>
              <Text style={styles.goText}>GO</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.downloadBtn}>
              <Feather name="download" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- FILTERS ROW --- */}
        <View style={styles.filterRow}>
          <View style={styles.unitDropdown}>
            <MaterialCommunityIcons name="map-marker-radius" size={16} color="#00A300" />
            <Text style={styles.dropdownText}>{selectedUnit}</Text>
            <Feather name="chevron-down" size={16} color="#94A3B8" />
          </View>
          <View style={styles.searchContainer}>
            <Feather name="search" size={16} color="#94A3B8" />
            <TextInput 
              placeholder="Search store or code..." 
              style={styles.searchField}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      </View>

      {/* --- LIST AREA --- */}
      <ScrollView contentContainerStyle={styles.listArea} showsVerticalScrollIndicator={false}>
        {retailers.map((item, index) => (
          <View key={index} style={styles.retailCard}>
            {/* CARD TOP */}
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.retCode}>{item.code}</Text>
                <Text style={styles.retName}>{item.name}</Text>
              </View>
              <View style={styles.typeTag}>
                <Text style={styles.typeText}>{item.type}</Text>
              </View>
            </View>

            {/* LOCATION & CONTACT */}
            <View style={styles.infoStrip}>
              <View style={styles.infoItem}>
                <Feather name="map-pin" size={12} color="#94A3B8" />
                <Text style={styles.infoText}>{item.street}</Text>
              </View>
              <View style={styles.infoItem}>
                <Feather name="user" size={12} color="#94A3B8" />
                <Text style={styles.infoText}>{item.contactPerson}</Text>
              </View>
            </View>

            <View style={styles.detailsGrid}>
                <View style={styles.detailBox}>
                    <Text style={styles.detCap}>MOBILE</Text>
                    <Text style={styles.detVal}>{item.mobile}</Text>
                </View>
                <View style={styles.detailBox}>
                    <Text style={styles.detCap}>GST NUMBER</Text>
                    <Text style={styles.detVal}>{item.gst}</Text>
                </View>
                <View style={[styles.detailBox, { borderRightWidth: 0 }]}>
                    <Text style={styles.detCap}>JOINED</Text>
                    <Text style={styles.detVal}>{item.joined}</Text>
                </View>
            </View>

            {/* PAYMENT STATUS */}
            <View style={styles.paymentRow}>
                <View style={styles.payBox}>
                    <Text style={styles.payCap}>PAID AMOUNT</Text>
                    <Text style={styles.paidVal}>₹{item.paid}</Text>
                </View>
                <View style={styles.payBox}>
                    <Text style={styles.payCapRed}>OUTSTANDING</Text>
                    <Text style={styles.outVal}>₹{item.outstanding}</Text>
                </View>
            </View>

            {/* ACTIONS */}
            <View style={styles.cardActions}>
                <TouchableOpacity style={styles.editBtn}>
                    <Feather name="edit-2" size={14} color="#64748B" />
                    <Text style={styles.editBtnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewBtn}>
                    <Text style={styles.viewBtnText}>View Details</Text>
                    <Feather name="arrow-right" size={14} color="#FFF" />
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
  
  // HEADER
  topHeader: { backgroundColor: '#FFF', padding: 16, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, elevation: 6 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  statLabel: { fontSize: 9, fontFamily: Fonts.bold, color: '#94A3B8', letterSpacing: 1 },
  statValue: { fontSize: 24, fontFamily: Fonts.bold, color: '#1E293B' },
  subStat: { fontSize: 12, color: '#64748B' },
  
  headerActions: { flexDirection: 'row', gap: 10 },
  goBtn: { backgroundColor: '#1A1A1A', paddingHorizontal: 20, height: 40, borderRadius: 10, justifyContent: 'center' },
  goText: { color: '#FFF', fontFamily: Fonts.bold, fontSize: 13 },
  downloadBtn: { backgroundColor: '#00A300', width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },

  filterRow: { flexDirection: 'row', gap: 10 },
  unitDropdown: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', paddingHorizontal: 12, borderRadius: 12, height: 44, borderWidth: 1, borderColor: '#E2E8F0' },
  dropdownText: { flex: 1, fontSize: 12, fontFamily: Fonts.bold, color: '#334155', marginLeft: 8 },
  searchContainer: { flex: 1.5, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', paddingHorizontal: 12, borderRadius: 12 },
  searchField: { flex: 1, marginLeft: 8, fontSize: 13, fontFamily: Fonts.medium },

  // LIST
  listArea: { padding: 16, paddingBottom: 100 },
  retailCard: { backgroundColor: '#FFF', borderRadius: 22, padding: 16, marginBottom: 16, elevation: 3, borderWidth: 1, borderColor: '#F1F5F9' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  retCode: { fontSize: 10, fontFamily: Fonts.bold, color: '#94A3B8' },
  retName: { fontSize: 18, fontFamily: Fonts.bold, color: '#1E293B' },
  typeTag: { backgroundColor: '#F0F9FF', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  typeText: { fontSize: 10, fontFamily: Fonts.bold, color: '#0284C7' },

  infoStrip: { flexDirection: 'row', gap: 15, marginBottom: 15 },
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  infoText: { fontSize: 12, color: '#64748B', fontFamily: Fonts.medium },

  detailsGrid: { flexDirection: 'row', backgroundColor: '#F8FAFC', borderRadius: 12, padding: 12, marginBottom: 15 },
  detailBox: { flex: 1, borderRightWidth: 1, borderRightColor: '#E2E8F0', paddingHorizontal: 4 },
  detCap: { fontSize: 8, fontFamily: Fonts.bold, color: '#94A3B8', marginBottom: 4 },
  detVal: { fontSize: 10, fontFamily: Fonts.bold, color: '#334155' },

  paymentRow: { flexDirection: 'row', gap: 12, marginBottom: 18 },
  payBox: { flex: 1, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#F1F5F9', padding: 10, borderRadius: 12 },
  payCap: { fontSize: 9, fontFamily: Fonts.bold, color: '#00A300', marginBottom: 2 },
  payCapRed: { fontSize: 9, fontFamily: Fonts.bold, color: '#EF4444', marginBottom: 2 },
  paidVal: { fontSize: 16, fontFamily: Fonts.bold, color: '#1E293B' },
  outVal: { fontSize: 16, fontFamily: Fonts.bold, color: '#DC2626' },

  cardActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 15 },
  editBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 8, paddingHorizontal: 15, borderRadius: 10, backgroundColor: '#F1F5F9' },
  editBtnText: { fontSize: 13, fontFamily: Fonts.bold, color: '#64748B' },
  viewBtn: { backgroundColor: '#00A300', flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12 },
  viewBtnText: { color: '#FFF', fontSize: 13, fontFamily: Fonts.bold }
});