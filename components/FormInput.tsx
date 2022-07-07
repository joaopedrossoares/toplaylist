import React from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

type FormInputProps = {
    label: string,
    placeholder: string
    value?: any,
    onChange: (e: Event) => void
}

export default function FormInput({label, placeholder, value, onChange}: FormInputProps) {
    const styles = StyleSheet.create({
        input: {
          height: 40,
          margin: 12,
          borderWidth: 2,
          borderColor: "white",
          borderRadius: 25,
          padding: 10,
          color: "white"
        },
        label: {
          color: "white",
          textAlign: "center"
        },
        container: {
            display: "flex",
            justifyContent: "center"
        }
      });

    return (
        <SafeAreaView>
          <View style={styles.container}>
            <View>
                <Text style={styles.label}>{label}</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
          </View>
        </SafeAreaView>
      );
}