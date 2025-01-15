import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/app/bill-manager/components/ui/Card";
import { Input } from "../components/ui/Input";
import { FloorReading } from "@/types";
import { ThemedText } from "@/components/ThemedText";

interface ReadingInputProps {
  mainReading: number;
  netBill: number;
  floorReadings: FloorReading[];
  previousMonthReading: number;
  onMainReadingChange: (value: number) => void;
  onNetBillChange: (value: number) => void;
  onFloorReadingChange: (id: string, value: number) => void;
  onPreviousMonthReadingChange: (value: number) => void;
}

export default function ReadingInput({
  mainReading,
  netBill,
  floorReadings,
  previousMonthReading,
  onMainReadingChange,
  onNetBillChange,
  onFloorReadingChange,
  onPreviousMonthReadingChange,
}: ReadingInputProps) {
  const currentMonthReading = mainReading;
  const difference = currentMonthReading - previousMonthReading;

  return (
    <Card>
      <CardHeader>
        <ThemedText type="title" style={styles.title}>
          Meter Readings
        </ThemedText>
        <ThemedText style={styles.description}>
          Enter the meter readings and bill details below
        </ThemedText>
      </CardHeader>
      <CardContent>
        <View style={styles.inputContainer}>
          <Input
            label="Previous Month Reading"
            value={
              previousMonthReading === 0 ? "" : previousMonthReading.toString()
            }
            onChangeText={(text) => onPreviousMonthReadingChange(Number(text))}
            keyboardType="numeric"
            placeholder="Enter previous month reading"
          />
          <Input
            label="Current Month Reading"
            value={mainReading === 0 ? "" : mainReading.toString()}
            onChangeText={(text) => onMainReadingChange(Number(text))}
            keyboardType="numeric"
            placeholder="Enter current month reading"
          />
          <Input
            label="Difference"
            value={difference.toString()}
            editable={false}
            keyboardType="numeric"
            placeholder="Auto-calculated"
          />
          <Input
            label="Net Current Bill"
            value={netBill === 0 ? "" : netBill.toString()}
            onChangeText={(text) => onNetBillChange(Number(text))}
            keyboardType="numeric"
            placeholder="Enter net current bill"
          />
        </View>

        {floorReadings.map((floor) => (
          <Input
            key={floor.id}
            label={`${floor.name} Reading`}
            value={floor.reading === 0 ? "" : floor.reading.toString()}
            onChangeText={(text) =>
              onFloorReadingChange(floor.id, Number(text))
            }
            keyboardType="numeric"
            placeholder={`Enter ${floor.name.toLowerCase()} reading`}
          />
        ))}
      </CardContent>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#6200ee", // Purple color for the title
  },
  description: {
    fontSize: 14,
    color: "#4a5568", // Medium gray text
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
});
