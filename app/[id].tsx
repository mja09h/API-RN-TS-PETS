import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pet, pets } from "../data/pets";
import { getPet, addPet } from "../api/pets";
import { useQuery } from "@tanstack/react-query";

export default function PetDetails() {
  const { id } = useLocalSearchParams();
  const [pet, setPet] = useState<Pet | null>(null);

  const getPetData = async () => {
     const foundPet = await getPet(Number(id));
    setPet(foundPet);
  };
  
  const { data, isLoading } = useQuery({
    queryKey: ["pet", id],
    queryFn: () => getPet(Number(id)),
  });

  // useEffect(() => {
  //   getPetData();
  // }, []);

  if (!data) {
    if (isLoading) {
      return <ActivityIndicator size="large" color="#6200EE" />;
    }
    return (
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Pet not found!</Text>
        </View>
        <TouchableOpacity onPress={() => getPetData()} style={styles.button}>
          <Text style={styles.buttonText}>Get Pet</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: data.image }} style={styles.petImage} />

        <View style={styles.header}>
          <Text style={styles.name}>{data.name}</Text>
          <View
            style={[
              styles.statusBadge,
              data.adopted === "Yes"
                ? styles.adoptedBadge
                : styles.availableBadge,
            ]}
          >
            <Text style={styles.statusText}>
              {data.adopted === "Yes" ? "✓ Adopted" : "Available"}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>ID:</Text>
            <Text style={styles.detailValue}>#{data.id}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Type:</Text>
            <Text style={styles.detailValue}>{data.type}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status:</Text>
            <Text style={styles.detailValue}>
              {data.adopted === "Yes" ? "Adopted" : "Available for adoption"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    paddingBottom: 20,
  },
  petImage: {
    width: "100%",
    height: 300,
    backgroundColor: "#f0f0f0",
  },
  header: {
    padding: 20,
    paddingBottom: 12,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  adoptedBadge: {
    backgroundColor: "#4CAF50",
  },
  availableBadge: {
    backgroundColor: "#FF9800",
  },
  statusText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#999",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  detailValue: {
    fontSize: 14,
    color: "#333",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#666",
  },
  button: {
    padding: 10,
    backgroundColor: "#6200EE",
    borderRadius: 5,
    margin: 10,
    
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
