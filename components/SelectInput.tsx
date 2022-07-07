import React from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

type SelectInput = {
    label: string,
    options?: {label: string, value: string}[],
    onValueChange: (value: string) => void
}

export default function SelectInput({label, options, onValueChange}: SelectInput) {
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
            
            <RNPickerSelect
                onValueChange={(value) => console.log(value)}
                items={options}
                onValueChange={onValueChange}
            />
          </View>
        </SafeAreaView>
      );
}