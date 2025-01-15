import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Pressable, Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { BillCalculation } from "@/types";
import { MaterialIcons } from "@expo/vector-icons"; // For icons
import * as Sharing from 'expo-sharing';
import * as Clipboard from 'expo-clipboard';

interface BillSummaryProps {
  calculations: BillCalculation[];
}

export default function BillSummary({ calculations }: BillSummaryProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  // Function to generate a shareable bill summary text
  const generateBillSummaryText = () => {
    let summary = 'Bill Summary:\n\n';
    calculations.forEach((calc) => {
      summary += `${calc.floorName}:\n`;
      summary += `  Reading: ${calc.reading} units\n`;
      summary += `  Bill Amount: ₹${calc.billAmount.toFixed(2)}\n`;
    //   if (calc.floorName === "First Floor") {
    //     summary += `  Remaining Bill: ₹${calc.remainingBill.toFixed(2)}\n`;
    //   }
      summary += '\n';
    });
    return summary;
  };

  // Function to share the bill summary
  const shareBillSummary = async () => {
    const summaryText = generateBillSummaryText();

    // Share using expo-sharing (opens system share sheet)
    await Sharing.shareAsync(summaryText, {
      dialogTitle: 'Share Bill Summary',
    });
  };

  // Function to copy the bill summary to the clipboard
  const copyToClipboard = async () => {
    const summaryText = generateBillSummaryText();
    await Clipboard.setStringAsync(summaryText);
    Alert.alert('Copied!', 'Bill summary copied to clipboard.');
  };

  return (
    <ThemedView style={styles.card}>
      <ThemedText type="title" style={styles.title}>
        Bill Summary
      </ThemedText>
      {calculations.map((calc) => (
        <View key={calc.floorId} style={styles.item}>
          <TouchableOpacity
            onPress={() => toggleExpand(calc.floorId)}
            style={styles.header}
          >
            <ThemedText type="subtitle" style={styles.floorName}>
              {calc.floorName}
            </ThemedText>
            <MaterialIcons
              name={expandedId === calc.floorId ? "expand-less" : "expand-more"}
              size={24}
              color="#6200ee" // Purple color for icons
            />
          </TouchableOpacity>

          {expandedId === calc.floorId && (
            <View style={styles.details}>
              <ThemedText style={styles.detailText}>
                Reading: {calc.reading} units
              </ThemedText>
              <ThemedText style={styles.detailText}>
                Bill Amount: ₹{calc.billAmount.toFixed(2)}
              </ThemedText>
              {/* {calc.floorName === "First Floor" && (
                <ThemedText style={styles.detailText}>
                  Remaining Bill: ₹{calc.remainingBill.toFixed(2)}
                </ThemedText>
              )} */}
            </View>
          )}
        </View>
      ))}

      {/* Share and Copy Buttons */}
      <View style={styles.buttonContainer}>
        <Pressable onPress={shareBillSummary} style={[styles.button, styles.shareButton]}>
          <MaterialIcons name="share" size={24} color="#ffffff" />
          <ThemedText style={styles.buttonText}>Share Bill Summary</ThemedText>
        </Pressable>
        <Pressable onPress={copyToClipboard} style={[styles.button, styles.copyButton]}>
          <MaterialIcons name="content-copy" size={24} color="#ffffff" />
          <ThemedText style={styles.buttonText}>Copy to Clipboard</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    backgroundColor: "#ffffff", // White background
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3, // For Android
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#6200ee", // Purple color for the title
  },
  item: {
    marginVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0", // Light gray border
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  floorName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2d3748", // Dark gray text
  },
  details: {
    paddingVertical: 8,
  },
  detailText: {
    fontSize: 16,
    color: "#4a5568", // Medium gray text
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  shareButton: {
    backgroundColor: "#6200ee", // Purple background
  },
  copyButton: {
    backgroundColor: "#03dac6", // Teal background
  },
  buttonText: {
    color: "#ffffff", // White text
    fontSize: 16,
    marginLeft: 8,
  },
});