import { View, Text, StyleSheet, FlatList, Pressable, Dimensions, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Fonts } from "@/constants/Fonts";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
const { width } = Dimensions.get("window");
// In a real system, this could be dynamically generated or loaded from a config
const dashboardData = [
    { id: "1", title: "Inventory", icon: "database", route: "./Modules/inventory", color: "#ef4444" },
    { id: "2", title: "Orders", icon: "shopping-bag", route: "/Modules/orders", color: "#00A300" },
    { id: "3", title: "Employee Management", icon: "users", route: "/Modules/Emp_Management", color: "#3b82f6" },
    { id: "4", title: "Retailer Management", icon: "book-open", route: "/Modules/ReatilerManagement", color: "#8b5cf6" },
    // { id: "5", title: "Accounts", icon: "users", route: "/modules/accounts", color: "#f59e0b" },
    // { id: "6", title: "Support", icon: "headphones", route: "/modules/support", color: "#06b6d4" },
];

export default function DashBoard() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar style="dark" />

            {/* MODERN HEADER */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <View>
                        <Text style={styles.brandTag}>POWER SOAPS</Text>
                        <Text style={styles.heading}>Distributor Panel</Text>
                    </View>
                    <View style={styles.logoCircle}>
                        <Image
                            source={require('../assets/images/logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                {/* BUSINESS QUICK STATS */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>124</Text>
                        <Text style={styles.statLabel}>New Orders</Text>
                    </View>
                    <View style={[styles.statItem, styles.statBorder]}>
                        <Text style={styles.statValue}>₹42.5k</Text>
                        <Text style={styles.statLabel}>Revenue</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={[styles.statValue, { color: '#ef4444' }]}>12</Text>
                        <Text style={styles.statLabel}>Low Stock</Text>
                    </View>
                </View>
            </View>

            <FlatList
                data={dashboardData}
                numColumns={2}
                keyExtractor={(item) => item.id}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => item.route && router.push(item.route as any)}
                        style={({ pressed }) => [
                            styles.card,
                            pressed && { transform: [{ scale: 0.97 }], backgroundColor: '#FBFBFB' },
                        ]}
                    >
                        <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
                            <Feather name={item.icon as any} size={22} color={item.color} />
                        </View>

                        <Text style={styles.title} numberOfLines={1}>
                            {item.title}
                        </Text>

                        <View style={styles.footer}>
                            <Text style={styles.manageText}>Open Portal</Text>
                            <Feather name="chevron-right" size={14} color="#BBB" />
                        </View>
                    </Pressable>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 25,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    brandTag: {
        fontFamily: Fonts.bold,
        fontSize: 10,
        color: "#EB228B",
        letterSpacing: 2.5,
        textTransform: "uppercase",
    },
    heading: {
        fontFamily: Fonts.bold,
        fontSize: 24,
        color: "#1a1a1a",
        marginTop: 2,
    },
    logoCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EB228B'
    },
    logo: {
        width: 35,
        height: 35,
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 24,
        paddingVertical: 20,
        paddingHorizontal: 10,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statBorder: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'rgba(187, 154, 154, 0.1)',
    },
    statValue: {
        fontFamily: Fonts.bold,
        fontSize: 18,
        color: '#1b0808ff',
    },
    statLabel: {
        fontFamily: Fonts.bold,
        fontSize: 11,
        color: '#1b0808ff',
        marginTop: 4,
        textTransform: 'uppercase',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    row: {
        justifyContent: "space-between",
        marginBottom: 16,
    },
    card: {
        width: (width - 56) / 2,
        backgroundColor: "#fff",
        borderRadius: 28,
        padding: 20,
        borderWidth: 1,
        borderColor: "#F2F2F2",
    },
    iconContainer: {
        height: 48,
        width: 48,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    title: {
        fontFamily: Fonts.bold,
        fontSize: 15,
        color: "#1a1a1a",
        marginBottom: 14,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: "#F5F5F5",
        paddingTop: 12,
    },
    manageText: {
        fontFamily: Fonts.medium,
        fontSize: 10,
        color: "#999",
    },
});
