import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export const Card = ({ children, style, ...props }: CardProps) => {
  return (
    <ThemedView style={[styles.card, style]} {...props}>
      {children}
    </ThemedView>
  );
};

export const CardHeader = ({ children, style, ...props }: CardProps) => {
  return (
    <View style={[styles.cardHeader, style]} {...props}>
      {children}
    </View>
  );
};

export const CardContent = ({ children, style, ...props }: CardProps) => {
  return (
    <View style={[styles.cardContent, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0", // Light gray border
    backgroundColor: "#ffffff", // White background
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // For Android
  },
  cardHeader: {
    padding: 24,
    flexDirection: "column",
    gap: 8,
  },
  cardContent: {
    padding: 24,
    paddingTop: 0,
  },
});

export default Card;
