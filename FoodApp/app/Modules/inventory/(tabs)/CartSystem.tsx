import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
  Platform,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useCart } from '@/context/CartContext';
import { Fonts } from '@/constants/Fonts';

const { width } = Dimensions.get('window');

export default function CartScreen() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart, totalAmount, itemCount, clearCart } = useCart();
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [orderId, setOrderId] = React.useState('');

  const handleCheckout = () => {
    const id = '#OR-' + Math.floor(1000 + Math.random() * 9000);
    setOrderId(id);
    setShowSuccess(true);
  };

  const handleDone = () => {
    setShowSuccess(false);
    clearCart();
  };

  const renderCartItem = (item: any) => (
    <View key={item.id} style={[styles.itemCard, styles.shadow]}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName}>{item.name}</Text>
          <TouchableOpacity onPress={() => removeFromCart(item.id)}>
            <Feather name="trash-2" size={18} color="#FF4B4B" />
          </TouchableOpacity>
        </View>
        <Text style={styles.itemWeight}>{item.weight}</Text>

        <View style={styles.itemFooter}>
          <Text style={styles.itemPrice}>{item.price}</Text>
          <View style={styles.qtyContainer}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Feather name="minus" size={16} color="#00A300" />
            </TouchableOpacity>

            <TextInput
              style={styles.qtyInput}
              keyboardType="numeric"
              value={String(item.quantity)}
              onChangeText={(text) => {
                const val = parseInt(text.replace(/[^0-9]/g, '')) || 0;
                updateQuantity(item.id, val);
              }}
            />

            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Feather name="plus" size={16} color="#00A300" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer} edges={['top']}>
        <View style={styles.emptyContent}>
          <View style={styles.emptyIconCircle}>
            <Feather name="shopping-cart" size={60} color="#00A300" />
          </View>
          <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
          <Text style={styles.emptySubtitle}>Looks like you haven't added anything yet.</Text>
          <TouchableOpacity style={styles.shopBtn} onPress={() => router.push('/')}>
            <Text style={styles.shopBtnText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
        <TouchableOpacity onPress={clearCart}>
          <Text style={styles.clearAll}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {cartItems.map(renderCartItem)}

        {/* ORDER SUMMARY */}
        <View style={[styles.summaryCard, styles.shadow]}>
          <Text style={styles.summaryTitle}>Order Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Pieces</Text>
            <Text style={styles.summaryValue}>{itemCount} pcs</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Estimated Boxes</Text>
            <Text style={styles.summaryValue}>{Math.ceil(itemCount / 10)} Boxes</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Grand Total</Text>
            <Text style={styles.totalValue}>₹{totalAmount.toLocaleString('en-IN')}</Text>
          </View>

          <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            <Feather name="arrow-right" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* SUCCESS MODAL */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.shadow]}>
            <LinearGradient
              colors={['#00A300', '#76e076']}
              style={styles.successCircle}
            >
              <Ionicons name="checkmark" size={60} color="#fff" />
            </LinearGradient>

            <Text style={styles.successTitle}>Payment Successful!</Text>
            <Text style={styles.successSub}>Thank you for your order.</Text>

            <View style={styles.orderInfoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Order ID</Text>
                <Text style={styles.infoValue}>{orderId}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Amount Paid</Text>
                <Text style={styles.infoValue}>₹{totalAmount.toLocaleString('en-IN')}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Payment Mode</Text>
                <Text style={styles.infoValue}>UPI (PhonePe)</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.doneBtn} onPress={handleDone}>
              <Text style={styles.doneBtnText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  headerTitle: { fontSize: 24, fontFamily: Fonts.bold, color: '#1a1a1a' },
  clearAll: { fontFamily: Fonts.medium, color: '#FF4B4B', fontSize: 13 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 120 },

  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0'
  },
  itemImage: { width: 85, height: 85, borderRadius: 15, backgroundColor: '#F8F9FA' },
  itemDetails: { flex: 1, marginLeft: 16, justifyContent: 'space-between' },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  itemName: { fontFamily: Fonts.bold, fontSize: 15, color: '#1a1a1a', flex: 1, marginRight: 8 },
  itemWeight: { fontFamily: Fonts.medium, fontSize: 12, color: '#999', marginTop: 2 },
  itemFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  itemPrice: { fontFamily: Fonts.bold, fontSize: 16, color: '#00A300' },

  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#EEE'
  },
  qtyBtn: { width: 30, height: 30, justifyContent: 'center', alignItems: 'center' },
  qtyInput: {
    width: 40,
    textAlign: 'center',
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: '#1a1a1a',
    padding: 0
  },

  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#F0F0F0'
  },
  summaryTitle: { fontFamily: Fonts.bold, fontSize: 18, color: '#1a1a1a', marginBottom: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  summaryLabel: { fontFamily: Fonts.medium, fontSize: 14, color: '#666' },
  summaryValue: { fontFamily: Fonts.bold, fontSize: 14, color: '#1a1a1a' },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 16 },
  totalLabel: { fontFamily: Fonts.bold, fontSize: 18, color: '#1a1a1a' },
  totalValue: { fontFamily: Fonts.bold, fontSize: 22, color: '#00A300' },

  checkoutBtn: {
    backgroundColor: '#00A300',
    borderRadius: 16,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    gap: 10
  },
  checkoutText: { color: '#fff', fontFamily: Fonts.bold, fontSize: 16 },

  emptyContainer: { flex: 1, backgroundColor: '#F8F9FA', justifyContent: 'center' },
  emptyContent: { alignItems: 'center', paddingHorizontal: 40 },
  emptyIconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E6F6E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24
  },
  emptyTitle: { fontFamily: Fonts.bold, fontSize: 20, color: '#1a1a1a', marginBottom: 8 },
  emptySubtitle: { fontFamily: Fonts.medium, fontSize: 14, color: '#999', textAlign: 'center', marginBottom: 32 },
  shopBtn: {
    backgroundColor: '#00A300',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 14
  },
  shopBtnText: { color: '#fff', fontFamily: Fonts.bold, fontSize: 15 },

  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4
  },

  // MODAL STYLES
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 32,
    padding: 32,
    alignItems: 'center'
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24
  },
  successTitle: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: '#1a1a1a',
    marginBottom: 8
  },
  successSub: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: '#999',
    marginBottom: 32
  },
  orderInfoCard: {
    width: '100%',
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    padding: 20,
    marginBottom: 32,
    gap: 12
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  infoLabel: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    color: '#666'
  },
  infoValue: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: '#1a1a1a'
  },
  doneBtn: {
    backgroundColor: '#00A300',
    width: '100%',
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  doneBtnText: {
    color: '#fff',
    fontFamily: Fonts.bold,
    fontSize: 16
  }
});