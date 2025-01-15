import React from "react";
import { TextInput, StyleSheet, TextInputProps, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface InputProps extends TextInputProps {
  label?: string;
}

export const Input = ({ label, style, ...props }: InputProps) => {
  return (
    <View style={styles.container}>
      {label && <ThemedText style={styles.label}>{label}</ThemedText>}
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor="#a0aec0" // Light gray placeholder
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: "#4a5568", // Dark gray text
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#e2e8f0", // Light gray border
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff", // White background
    fontSize: 16,
    color: "#2d3748", // Dark gray text
  },
});

// Add a default export
export default Input;
