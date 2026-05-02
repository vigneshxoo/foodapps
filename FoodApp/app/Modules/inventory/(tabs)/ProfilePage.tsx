import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts } from '@/constants/Fonts';
const { width } = Dimensions.get('window');

const SETTINGS_OPTIONS = [
  { id: 1, label: 'Edit Profile', icon: 'user', type: 'feather', color: '#4F46E5' },
  { id: 2, label: 'Saved Addresses', icon: 'map-pin', type: 'feather', color: '#10B981' },
  { id: 3, label: 'Order History', icon: 'shopping-bag', type: 'feather', color: '#F59E0B' },
  { id: 4, label: 'App Notifications', icon: 'bell', type: 'feather', color: '#EF4444' },
  { id: 5, label: 'Payment Methods', icon: 'credit-card', type: 'feather', color: '#8B5CF6' },
  { id: 6, label: 'Terms & Privacy', icon: 'shield', type: 'feather', color: '#6B7280' },
  { id: 7, label: 'Help Center', icon: 'help-circle', type: 'feather', color: '#06B6D4' },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* PROFILE HEADER */}
        <View style={styles.headerCard}>
          <LinearGradient
            colors={['#00A300', '#76e076']}
            style={styles.headerBg}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36' }}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.editBadge}>
                <Feather name="camera" size={14} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.userMeta}>
              <Text style={styles.userName}>Vignesh Kumar</Text>
              <View style={styles.memberBadge}>
                <MaterialCommunityIcons name="crown" size={14} color="#FFD700" />
                <Text style={styles.memberText}>Prime Member</Text>
              </View>
            </View>
          </View>

          {/* STATS ROW */}
          <View style={[styles.statsRow, styles.shadow]}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={statItemStyles.statItemCenter}>
              <Text style={styles.statValue}>₹1,240</Text>
              <Text style={styles.statLabel}>Saved</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>480</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
          </View>
        </View>

        {/* SETTINGS LIST */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <View style={[styles.settingsCard, styles.shadow]}>
            {SETTINGS_OPTIONS.map((item, index) => (
              <React.Fragment key={item.id}>
                <TouchableOpacity style={styles.settingItem}>
                  <View style={[styles.iconWrap, { backgroundColor: item.color + '15' }]}>
                    <Feather name={item.icon as any} size={18} color={item.color} />
                  </View>
                  <Text style={styles.settingLabel}>{item.label}</Text>
                  <Feather name="chevron-right" size={18} color="#CCC" />
                </TouchableOpacity>
                {index < SETTINGS_OPTIONS.length - 1 && <View style={styles.settingDivider} />}
              </React.Fragment>
            ))}
          </View>

          <TouchableOpacity style={[styles.logoutBtn, styles.shadow]}>
            <Feather name="log-out" size={18} color="#FF4B4B" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.versionText}>Version 1.0.4 (Build 82)</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const statItemStyles = StyleSheet.create({
  statItemCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  scrollContent: { paddingBottom: 100 },

  headerCard: {
    height: 280,
    position: 'relative',
    alignItems: 'center',
    paddingTop: 40
  },
  headerBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 220,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40
  },
  profileSection: { alignItems: 'center', zIndex: 1 },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#f0f0f0'
  },
  avatar: { width: '100%', height: '100%', borderRadius: 50 },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#00A300',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff'
  },
  userMeta: { alignItems: 'center', marginTop: 12 },
  userName: { fontFamily: Fonts.bold, fontSize: 22, color: '#fff' },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
    gap: 4
  },
  memberText: { color: '#fff', fontFamily: Fonts.bold, fontSize: 10 },

  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 24,
    borderRadius: 20,
    paddingVertical: 20,
    marginTop: 25,
    zIndex: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0'
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontFamily: Fonts.bold, fontSize: 18, color: '#1a1a1a' },
  statLabel: { fontFamily: Fonts.medium, fontSize: 12, color: '#999', marginTop: 2 },
  statDivider: { width: 1, height: '60%', backgroundColor: '#F0F0F0', alignSelf: 'center' },

  settingsSection: { marginTop: 30, paddingHorizontal: 24 },
  sectionTitle: { fontFamily: Fonts.bold, fontSize: 16, color: '#1a1a1a', marginBottom: 16, marginLeft: 4 },
  settingsCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0'
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  settingLabel: { flex: 1, marginLeft: 16, fontFamily: Fonts.medium, fontSize: 15, color: '#333' },
  settingDivider: { height: 1, backgroundColor: '#F8F9FA', marginHorizontal: 16 },

  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 24,
    height: 56,
    borderRadius: 18,
    gap: 10,
    borderWidth: 1,
    borderColor: '#FFEBEB'
  },
  logoutText: { color: '#FF4B4B', fontFamily: Fonts.bold, fontSize: 16 },

  versionText: {
    textAlign: 'center',
    color: '#CCC',
    fontFamily: Fonts.medium,
    fontSize: 12,
    marginTop: 32
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3
  },
});