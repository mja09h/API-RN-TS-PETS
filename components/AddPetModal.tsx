import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Pet } from "../data/pets";
import { addPet } from "../api/pets";

interface AddPetModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (pet: Pet) => void;
}

export const AddPetModal: React.FC<AddPetModalProps> = ({
  visible,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [adopted, setAdopted] = useState("");
  const [image, setImage] = useState("");
  

 
  const handleAdd = async () => {
    if (name.trim() && type.trim()) {
      try {
      const maxId = Date.now(); // Generate unique ID using rtimestamp
      const newPet = await addPet(
        name.trim(),
        image.trim() || "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=400&fit=crop",
        type.trim(),
        adopted.trim().toLowerCase() === "yes" ? true : false
      )
      onAdd(newPet);

      // Reset form
      setName("");
      setType("");
      setAdopted("");
      setImage("");
      onClose();

    } catch (error) {
      console.error("Error adding pet:", error);
    }}
  };

  const handleCancel = () => {
    setName("");
    setType("");
    setAdopted("");
    setImage("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Add New Pet</Text>
            <TouchableOpacity onPress={handleCancel} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter pet name"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Type *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter pet type (e.g., Dog, Cat)"
                value={type}
                onChangeText={setType}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Adopted</Text>
              <TextInput
                style={styles.input}
                placeholder="Yes or No (default: No)"
                value={adopted}
                onChangeText={setAdopted}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Image URL</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter image URL (optional)"
                value={image}
                onChangeText={setImage}
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.addButton]}
              onPress={handleAdd}
              disabled={!name.trim() || !type.trim()}
            >
              <Text style={styles.addButtonText}>Add Pet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: "50%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#666",
  },
  form: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f0f0f0",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: "#6200EE",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

