import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@/constants/Fonts';

export default function CreateEmployee() {
    return (
        <SafeAreaView style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn}>
                    <Feather name="chevron-left" size={24} color="#1E293B" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add New Employee</Text>
                <View style={{ width: 40 }} /> 
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                
                {/* 1. PROFILE IMAGE UPLOAD */}
                <View style={styles.imageUploadSection}>
                    <TouchableOpacity style={styles.profileImageCircle}>
                        <Feather name="camera" size={30} color="#94A3B8" />
                        <View style={styles.addIconSmall}>
                            <Feather name="plus" size={14} color="#FFF" />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.uploadLabel}>Upload Profile Picture</Text>
                </View>

                {/* 2. PERSONAL DETAILS SECTION */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Personal Details</Text>
                    
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Full Name</Text>
                        <TextInput style={styles.input} placeholder="Enter employee name" placeholderTextColor="#CBD5E1" />
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.inputGroup, { flex: 1 }]}>
                            <Text style={styles.inputLabel}>Date of Birth</Text>
                            <View style={styles.inputWithIcon}>
                                <TextInput style={styles.flexInput} placeholder="DD/MM/YYYY" placeholderTextColor="#CBD5E1" />
                                <Feather name="calendar" size={16} color="#00A300" />
                            </View>
                        </View>
                        <View style={[styles.inputGroup, { flex: 1, marginLeft: 12 }]}>
                            <Text style={styles.inputLabel}>Gender</Text>
                            <View style={styles.inputWithIcon}>
                                <TextInput style={styles.flexInput} placeholder="Select" placeholderTextColor="#CBD5E1" />
                                <Feather name="chevron-down" size={16} color="#94A3B8" />
                            </View>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.inputGroup, { flex: 1 }]}>
                            <Text style={styles.inputLabel}>Blood Group</Text>
                            <TextInput style={styles.input} placeholder="e.g. O+" placeholderTextColor="#CBD5E1" />
                        </View>
                        <View style={[styles.inputGroup, { flex: 1, marginLeft: 12 }]}>
                            <Text style={styles.inputLabel}>Mobile Number</Text>
                            <TextInput style={styles.input} placeholder="98765..." keyboardType="phone-pad" placeholderTextColor="#CBD5E1" />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Email Address</Text>
                        <TextInput style={styles.input} placeholder="email@company.com" keyboardType="email-address" placeholderTextColor="#CBD5E1" />
                    </View>
                </View>

                {/* 3. PROFESSIONAL DETAILS SECTION */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Work Details</Text>
                    
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Employee ID</Text>
                        <TextInput style={styles.input} placeholder="EMP-XXXX" placeholderTextColor="#CBD5E1" />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Department</Text>
                        <View style={styles.inputWithIcon}>
                            <TextInput style={styles.flexInput} placeholder="Select Department" placeholderTextColor="#CBD5E1" />
                            <Feather name="briefcase" size={16} color="#94A3B8" />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Joining Date</Text>
                        <View style={styles.inputWithIcon}>
                            <TextInput style={styles.flexInput} placeholder="DD/MM/YYYY" placeholderTextColor="#CBD5E1" />
                            <Feather name="calendar" size={16} color="#00A300" />
                        </View>
                    </View>
                </View>

                {/* 4. ADDRESS SECTION */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Address Information</Text>
                    
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Street Address</Text>
                        <TextInput style={styles.input} placeholder="House No, Street name" placeholderTextColor="#CBD5E1" />
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.inputGroup, { flex: 1 }]}>
                            <Text style={styles.inputLabel}>District</Text>
                            <TextInput style={styles.input} placeholder="District" placeholderTextColor="#CBD5E1" />
                        </View>
                        <View style={[styles.inputGroup, { flex: 1, marginLeft: 12 }]}>
                            <Text style={styles.inputLabel}>City</Text>
                            <TextInput style={styles.input} placeholder="City" placeholderTextColor="#CBD5E1" />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Pincode</Text>
                        <TextInput style={styles.input} placeholder="600001" keyboardType="number-pad" placeholderTextColor="#CBD5E1" />
                    </View>
                </View>

                {/* 5. DOCUMENT ATTACHMENTS (3 PHOTOS) */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Professional Documents</Text>
                    <Text style={styles.subCap}>Upload 3 Proofs (Aadhar, License, etc.)</Text>
                    
                    <View style={styles.attachmentRow}>
                        {[1, 2, 3].map((item) => (
                            <TouchableOpacity key={item} style={styles.attachBox}>
                                <Feather name="file-plus" size={20} color="#00A300" />
                                <Text style={styles.attachText}>Proof {item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* SAVE BUTTON */}
                <TouchableOpacity style={styles.saveBtn}>
                    <Text style={styles.saveBtnText}>Save Employee Profile</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#FFF' },
    headerTitle: { fontSize: 18, fontFamily: Fonts.bold, color: '#1E293B' },
    backBtn: { padding: 4 },

    scrollContainer: { padding: 16, paddingBottom: 50 },

    // Profile Image
    imageUploadSection: { alignItems: 'center', marginBottom: 25 },
    profileImageCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0', borderStyle: 'dashed' },
    addIconSmall: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#00A300', width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFF' },
    uploadLabel: { marginTop: 10, fontSize: 12, fontFamily: Fonts.bold, color: '#64748B' },

    // Section Cards
    sectionCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 16, marginBottom: 20, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
    sectionTitle: { fontSize: 15, fontFamily: Fonts.bold, color: '#1E293B', marginBottom: 15, borderLeftWidth: 4, borderLeftColor: '#00A300', paddingLeft: 10 },
    subCap: { fontSize: 11, color: '#94A3B8', marginBottom: 15, marginTop: -10 },

    // Inputs
    inputGroup: { marginBottom: 15 },
    inputLabel: { fontSize: 11, fontFamily: Fonts.bold, color: '#64748B', marginBottom: 6 },
    input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, paddingHorizontal: 12, height: 48, fontSize: 14, fontFamily: Fonts.medium, color: '#1E293B' },
    inputWithIcon: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, paddingHorizontal: 12, height: 48 },
    flexInput: { flex: 1, fontSize: 14, fontFamily: Fonts.medium, color: '#1E293B' },
    row: { flexDirection: 'row' },

    // Attachments
    attachmentRow: { flexDirection: 'row', justifyContent: 'space-between' },
    attachBox: { width: '31%', aspectRatio: 1, backgroundColor: '#F0FDF4', borderRadius: 12, borderStyle: 'dashed', borderWidth: 1, borderColor: '#00A300', justifyContent: 'center', alignItems: 'center' },
    attachText: { fontSize: 9, fontFamily: Fonts.bold, color: '#00A300', marginTop: 5 },

    // Footer
    saveBtn: { backgroundColor: '#00A300', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginTop: 10, shadowColor: '#00A300', shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
    saveBtnText: { color: '#FFF', fontSize: 16, fontFamily: Fonts.bold }
});