import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Fonts } from '@/constants/Fonts';

export default function EmployeeList() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeDept, setActiveDept] = useState('All');
    
    const departments = ['All', 'Delivery', 'Sales', 'Admin'];

    // Mock Data based on your requirements
    const employees = [
        { 
            id: 'EMP-001', 
            name: 'Arun Kumar', 
            dept: 'Delivery', 
            phone: '+91 98765 43210', 
            email: 'arun.k@company.com',
            joined: '12 Jan 2024'
        },
        { 
            id: 'EMP-002', 
            name: 'Priya Dharshini', 
            dept: 'Sales', 
            phone: '+91 98450 11223', 
            email: 'priya.d@company.com',
            joined: '05 Feb 2024'
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* --- HEADER --- */}
            <View style={styles.header}>
                <View style={styles.searchRow}>
                    <View style={styles.searchBar}>
                        <Feather name="search" size={18} color="#94A3B8" />
                        <TextInput 
                            placeholder="Search employee name or ID..." 
                            style={styles.searchInput}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholderTextColor="#94A3B8"
                        />
                    </View>
                    <TouchableOpacity style={styles.addBtn}>
                        <Feather name="plus" size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>

                {/* TOTAL COUNT & DEPT FILTER */}
                <View style={styles.statsRow}>
                    <View>
                        <Text style={styles.statLabel}>TOTAL EMPLOYEES</Text>
                        <Text style={styles.statValue}>48 Active</Text>
                    </View>
                    <View style={styles.deptScroll}>
                        {departments.map((dept) => (
                            <TouchableOpacity 
                                key={dept} 
                                style={[styles.deptChip, activeDept === dept && styles.activeDeptChip]}
                                onPress={() => setActiveDept(dept)}
                            >
                                <Text style={[styles.deptText, activeDept === dept && styles.activeDeptText]}>{dept}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>

            {/* --- LIST AREA --- */}
            <ScrollView contentContainerStyle={styles.listArea} showsVerticalScrollIndicator={false}>
                {employees.map((emp) => (
                    <View key={emp.id} style={styles.empCard}>
                        {/* TOP: ID & DEPT */}
                        <View style={styles.cardHeader}>
                            <View style={styles.idBox}>
                                <Text style={styles.idLabel}>ID:</Text>
                                <Text style={styles.idValue}>{emp.id}</Text>
                            </View>
                            <View style={[styles.deptBadge, { backgroundColor: emp.dept === 'Delivery' ? '#E0F2FE' : '#F0FDF4' }]}>
                                <Text style={[styles.deptBadgeText, { color: emp.dept === 'Delivery' ? '#0284C7' : '#166534' }]}>
                                    {emp.dept.toUpperCase()}
                                </Text>
                            </View>
                        </View>

                        {/* NAME & CONTACT */}
                        <View style={styles.mainInfo}>
                            <Text style={styles.empName}>{emp.name}</Text>
                            <View style={styles.contactRow}>
                                <Feather name="phone" size={12} color="#94A3B8" />
                                <Text style={styles.contactText}>{emp.phone}</Text>
                                <View style={styles.dot} />
                                <Feather name="mail" size={12} color="#94A3B8" />
                                <Text style={styles.contactText} numberOfLines={1}>{emp.email}</Text>
                            </View>
                        </View>

                        {/* JOINING DATE STRIP */}
                        <View style={styles.dateStrip}>
                            <Text style={styles.dateLabel}>JOINED ON</Text>
                            <Text style={styles.dateValue}>{emp.joined}</Text>
                        </View>

                        {/* ACTION BUTTONS */}
                        <View style={styles.actionRow}>
                            <TouchableOpacity style={[styles.actionBtn, styles.editBtn]}>
                                <Feather name="edit-3" size={14} color="#475569" />
                                <Text style={styles.editBtnText}>Edit</Text>
                            </TouchableOpacity>

                            <View style={styles.rightActions}>
                                <TouchableOpacity style={styles.iconBtn}>
                                    <MaterialCommunityIcons name="history" size={20} color="#00A300" />
                                    <Text style={styles.iconBtnText}>Logs</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={[styles.iconBtn, { marginLeft: 15 }]}>
                                    <Ionicons name="location-outline" size={20} color="#00A300" />
                                    <Text style={styles.iconBtnText}>Location</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    
    // --- HEADER ---
    header: { 
        backgroundColor: '#FFF', 
        padding: 16, 
        borderBottomLeftRadius: 24, 
        borderBottomRightRadius: 24, 
        elevation: 4 
    },
    searchRow: { flexDirection: 'row', gap: 10, marginBottom: 18 },
    searchBar: { 
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#F1F5F9', 
        borderRadius: 12, 
        paddingHorizontal: 12, 
        height: 45 
    },
    searchInput: { flex: 1, marginLeft: 10, fontSize: 14, fontFamily: Fonts.bold, color: '#1E293B' },
    addBtn: { backgroundColor: '#00A300', width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    statLabel: { fontSize: 8, fontFamily: Fonts.bold, color: '#94A3B8' },
    statValue: { fontSize: 18, fontFamily: Fonts.bold, color: '#1E293B' },
    
    deptScroll: { flexDirection: 'row', gap: 8 },
    deptChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: '#F1F5F9' },
    activeDeptChip: { backgroundColor: '#00A300' },
    deptText: { fontSize: 11, fontFamily: Fonts.bold, color: '#64748B' },
    activeDeptText: { color: '#FFF' },

    // --- CARD ---
    listArea: { padding: 16, paddingBottom: 100 },
    empCard: { 
        backgroundColor: '#FFF', 
        borderRadius: 20, 
        padding: 16, 
        marginBottom: 16, 
        borderWidth: 1, 
        borderColor: '#F1F5F9',
        elevation: 2 
    },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    idBox: { flexDirection: 'row', gap: 4 },
    idLabel: { fontSize: 10, color: '#94A3B8', fontFamily: Fonts.bold },
    idValue: { fontSize: 10, color: '#64748B', fontFamily: Fonts.bold },
    deptBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    deptBadgeText: { fontSize: 9, fontFamily: Fonts.bold },

    mainInfo: { marginBottom: 15 },
    empName: { fontSize: 18, fontFamily: Fonts.bold, color: '#1E293B', marginBottom: 4 },
    contactRow: { flexDirection: 'row', alignItems: 'center' },
    contactText: { fontSize: 11, color: '#64748B', marginLeft: 4, fontFamily: Fonts.medium },
    dot: { width: 3, height: 3, borderRadius: 2, backgroundColor: '#CBD5E1', marginHorizontal: 8 },

    dateStrip: { 
        backgroundColor: '#F8FAFC', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        padding: 10, 
        borderRadius: 12, 
        marginBottom: 15 
    },
    dateLabel: { fontSize: 9, color: '#94A3B8', fontFamily: Fonts.bold },
    dateValue: { fontSize: 11, color: '#475569', fontFamily: Fonts.bold },

    actionRow: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderTopWidth: 1, 
        borderTopColor: '#F1F5F9', 
        paddingTop: 15 
    },
    editBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
    editBtnText: { fontSize: 12, color: '#475569', fontFamily: Fonts.bold, marginLeft: 5 },
    
    rightActions: { flexDirection: 'row' },
    iconBtn: { alignItems: 'center' },
    iconBtnText: { fontSize: 8, fontFamily: Fonts.bold, color: '#94A3B8', marginTop: 2 },
    actionBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
   
});