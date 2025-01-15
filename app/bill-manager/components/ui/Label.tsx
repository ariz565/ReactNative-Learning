import React from "react";
import { Text, StyleSheet, TextProps } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface LabelProps extends TextProps {
  children: React.ReactNode;
}

export const Label = ({ children, style, ...props }: LabelProps) => {
  return (
    <ThemedText style={[styles.label, style]} {...props}>
      {children}
    </ThemedText>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: "#4a5568", // Dark gray text
  },
});

// Add a default export
export default Label;
