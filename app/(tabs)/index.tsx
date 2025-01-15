import React from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient"; // For gradient background
import { MaterialIcons } from "@expo/vector-icons"; // For icons

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={["#000000", "#808080"]} // Purple to teal gradient
      style={styles.container}
    >
      <ThemedView style={styles.card}>
        <ThemedText type="title" style={styles.title}>
          Electricity Bill Manager
        </ThemedText>
        <ThemedText style={styles.description}>
          Manage your electricity bills efficiently.
        </ThemedText>
        {/* Add a button to navigate to the Bill Manager */}
        <Link href="/bill-manager" asChild>
          <Pressable style={styles.button}>
            <MaterialIcons name="calculate" size={24} color="#ffffff" />
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              Go to Bill Manager
            </ThemedText>
          </Pressable>
        </Link>
      </ThemedView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    padding: 24,
    borderRadius: 16,
    backgroundColor: "#ffffff", // White background
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // For Android
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#6200ee", // Purple color for the title
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#4a5568", // Medium gray text
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6200ee", // Purple background
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "100%",
  },
  buttonText: {
    color: "#ffffff", // White text
    fontSize: 16,
    marginLeft: 8,
  },
});
