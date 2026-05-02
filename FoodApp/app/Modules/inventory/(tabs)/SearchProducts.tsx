import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { useCart } from '../../context/CartContext';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'expo-router';
import { PRODUCTS } from '@/constants/Products';
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts } from '@/constants/Fonts';

const { width } = Dimensions.get('window');

const CATEGORIES = ['All', 'Bath Soap', 'Detergent', 'Cake', 'Liquid'];

const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Power Detergent",
    price: "₹44.00",
    weight: "500g",
    image: "https://static.wixstatic.com/media/052b2d_ce922366a3ad45b8815e5114dd7c3632~mv2.jpg",
    category: "Detergent",
    tag: "Best Seller"
  },
  {
    id: 2,
    name: "Aloe Vera Soap",
    price: "₹35.00",
    weight: "125g",
    image: "https://static.wixstatic.com/media/052b2d_918048c738f2483299dcab0bd56fdb82~mv2.jpg",
    category: "Bath Soap",
    tag: "Pure"
  },
  {
    id: 3,
    name: "Dishwash Gel",
    price: "₹20.00",
    weight: "250ml",
    image: "https://static.wixstatic.com/media/052b2d_04075237799a410ba8005b3414d51e22~mv2.jpg",
    category: "Liquid",
    tag: "Eco"
  },
  {
    id: 4,
    name: "Family Combo",
    price: "₹199.00",
    weight: "Pack of 5",
    image: "https://static.wixstatic.com/media/052b2d_ec5fdd594ff74477ba5d12d3158b5789~mv2.jpg",
    category: "Detergent",
    tag: "Value"
  },
  {
    id: 5,
    name: "Power Cake",
    price: "₹15.00",
    weight: "150g",
    image: "https://static.wixstatic.com/media/052b2d_ce922366a3ad45b8815e5114dd7c3632~mv2.jpg", // placeholder
    category: "Cake",
    tag: "Strong"
  },
  {
    id: 6,
    name: "Lemon Liquid",
    price: "₹45.00",
    weight: "500ml",
    image: "https://static.wixstatic.com/media/052b2d_04075237799a410ba8005b3414d51e22~mv2.jpg", // placeholder
    category: "Liquid",
    tag: "Fresh"
  },
  {
    id: 7,
    name: "Sandal Soap",
    price: "₹40.00",
    weight: "125g",
    image: "https://static.wixstatic.com/media/052b2d_918048c738f2483299dcab0bd56fdb82~mv2.jpg", // placeholder
    category: "Bath Soap",
    tag: "Premium"
  },
];

export default function InventoryExploreScreen() {
  const router = useRouter();
  const { addToCart, itemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const handleAddToCart = (product: any) => addToCart(product);

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSubtitle}>Discover the best</Text>
          <Text style={styles.title}>Explore Range</Text>
        </View>
        <TouchableOpacity style={styles.cartBtn}>
          <Feather name="shopping-bag" size={22} color="#000" />
          {itemCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{itemCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Feather name="search" size={18} color="#999" />
          <TextInput
            placeholder="Search for perfection..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* CATEGORIES */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catScroll}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.catItem,
                activeCategory === cat && styles.catItemActive
              ]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[
                styles.catText,
                activeCategory === cat && styles.catTextActive
              ]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* PRODUCT LISTING */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
      >
        <View style={styles.grid}>
          {filteredProducts.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.card, styles.shadow]}
              onPress={() => router.push(`/product/${item.id}` as any)}
            >
              <View style={styles.tagBadge}>
                <MaterialCommunityIcons name="star-outline" size={12} color="#4CAF50" />
                <Text style={styles.tagText}>{item.tag}</Text>
              </View>
              <Image source={{ uri: item.image }} style={styles.cardImg} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.cardWeight}>{item.weight} • {item.category}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.cardPrice}>{item.price}</Text>
                  <TouchableOpacity style={styles.addBtn} onPress={() => handleAddToCart(item)}>
                    <Ionicons name="add" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {filteredProducts.length === 0 && (
          <View style={styles.noResults}>
            <Feather name="search" size={50} color="#DDD" />
            <Text style={styles.noResultsText}>No products found matching your search.</Text>
          </View>
        )}
      </ScrollView>
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
    paddingTop: 15,
    paddingBottom: 20
  },
  headerSubtitle: { fontFamily: Fonts.medium, fontSize: 12, color: '#999' },
  title: { fontSize: 26, fontFamily: Fonts.bold, color: '#1a1a1a' },
  cartBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF4B4B',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#fff'
  },
  cartBadgeText: { color: '#fff', fontSize: 10, fontFamily: Fonts.bold },

  searchRow: { flexDirection: 'row', paddingHorizontal: 24, gap: 12, marginBottom: 20 },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    height: 52,
    elevation: 1
  },
  searchInput: { marginLeft: 10, flex: 1, fontFamily: Fonts.medium, fontSize: 13 },
  filterBtn: {
    width: 52,
    height: 52,
    backgroundColor: '#00A300',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  catScroll: { paddingHorizontal: 24, gap: 10, paddingBottom: 15 },
  catItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EEE'
  },
  catItemActive: { backgroundColor: '#00A300', borderColor: '#00A300' },
  catText: { fontFamily: Fonts.medium, fontSize: 13, color: '#666' },
  catTextActive: { color: '#fff', fontFamily: Fonts.bold },
  gridContainer: { paddingBottom: 100 },
  grid: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between'
  },
  card: {
    width: (width - 64) / 2,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0'
  },
  tagBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  tagText: { fontSize: 9, fontFamily: Fonts.bold, color: '#4CAF50' },
  cardImg: { width: '100%', height: 120, borderRadius: 18, resizeMode: 'cover' },
  cardInfo: { padding: 8 },
  cardTitle: { fontFamily: Fonts.bold, fontSize: 14, color: '#1a1a1a' },
  cardWeight: { fontFamily: Fonts.medium, color: '#999', fontSize: 10, marginTop: 2 },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  cardPrice: { fontFamily: Fonts.bold, fontSize: 16, color: '#00A300' },
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#00A300',
    justifyContent: 'center',
    alignItems: 'center'
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4
  },
  noResults: {
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 40
  },
  noResultsText: {
    marginTop: 15,
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: '#999',
    textAlign: 'center'
  }
});
