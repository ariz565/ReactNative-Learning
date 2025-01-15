import React, { useState, useCallback, useMemo } from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { ThemedText} from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ReadingInput from "./components/ReadingInput";
import BillSummary from "./components/BillSummary";
import { FloorReading, BillCalculation } from "@/types";
import { ELECTRICITY_RATE, FIXED_CHARGE } from "@/types";

export default function BillManagerScreen() {
  const [mainReading, setMainReading] = useState<number>(0);
  const [netBill, setNetBill] = useState<number>(0);
  const [previousMonthReading, setPreviousMonthReading] = useState<number>(0);
  const [floorReadings, setFloorReadings] = useState<FloorReading[]>([
    { id: "1", name: "First Floor", reading: 0 },
    { id: "2", name: "Ground Floor", reading: 0 },
  ]);

  const handleFloorReadingChange = useCallback((id: string, value: number) => {
    setFloorReadings((prev) =>
      prev.map((floor) =>
        floor.id === id ? { ...floor, reading: value } : floor
      )
    );
  }, []);

  const calculations = useMemo<BillCalculation[]>(() => {
    return floorReadings.map((floor, index) => {
      if (index === 0) {
        const billAmount = floor.reading * ELECTRICITY_RATE + FIXED_CHARGE;
        const remainingBill = netBill - billAmount;
        return {
          floorId: floor.id,
          floorName: floor.name,
          reading: floor.reading,
          billAmount,
          remainingBill,
        };
      } else {
        const firstFloorBill =
          floorReadings[0].reading * ELECTRICITY_RATE + FIXED_CHARGE;
        return {
          floorId: floor.id,
          floorName: floor.name,
          reading: floor.reading,
          billAmount: netBill - firstFloorBill,
          remainingBill: 0,
        };
      }
    });
  }, [floorReadings, netBill]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title">Electricity Bill Manager</ThemedText>
      <ThemedText style={styles.description}>
        Manage your electricity bills efficiently.
      </ThemedText>

      <ReadingInput
        mainReading={mainReading}
        netBill={netBill}
        previousMonthReading={previousMonthReading}
        floorReadings={floorReadings}
        onMainReadingChange={setMainReading}
        onNetBillChange={setNetBill}
        onPreviousMonthReadingChange={setPreviousMonthReading}
        onFloorReadingChange={handleFloorReadingChange}
      />

      {mainReading > 0 && netBill > 0 && (
        <>
          <BillSummary calculations={calculations} />

          {/* Download Buttons */}
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button}>
              <ThemedText type="defaultSemiBold" style={styles.buttonText}>
                Download as Image
              </ThemedText>
            </Pressable>
            <Pressable style={styles.button}>
              <ThemedText type="defaultSemiBold" style={styles.buttonText}>
                Download as PDF
              </ThemedText>
            </Pressable>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  description: {
    marginTop: 8,
    fontSize: 16,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 24,
  },
  button: {
    padding: 16,
    backgroundColor: "#6200ee",
    borderRadius: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});
