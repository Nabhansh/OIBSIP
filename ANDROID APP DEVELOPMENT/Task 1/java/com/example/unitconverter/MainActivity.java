package com.example.unitconverter;

import android.os.Bundle;
import android.view.View;
import android.widget.*;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    Spinner spinnerCategory;
    Spinner spinnerFrom;
    Spinner spinnerTo;

    EditText editValue;

    Button btnConvert;

    TextView txtResult;

    String[] categories = {
            "Length",
            "Weight",
            "Temperature"
    };

    String[] lengthUnits = {
            "Centimeter",
            "Meter",
            "Kilometer"
    };

    String[] weightUnits = {
            "Gram",
            "Kilogram",
            "Pound"
    };

    String[] tempUnits = {
            "Celsius",
            "Fahrenheit",
            "Kelvin"
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        spinnerCategory =
                findViewById(R.id.spinnerCategory);

        spinnerFrom =
                findViewById(R.id.spinnerFrom);

        spinnerTo =
                findViewById(R.id.spinnerTo);

        editValue =
                findViewById(R.id.editValue);

        btnConvert =
                findViewById(R.id.btnConvert);

        txtResult =
                findViewById(R.id.txtResult);

        ArrayAdapter<String> categoryAdapter =
                new ArrayAdapter<>(
                        this,
                        android.R.layout.simple_spinner_item,
                        categories
                );

        categoryAdapter.setDropDownViewResource(
                android.R.layout.simple_spinner_dropdown_item
        );

        spinnerCategory.setAdapter(categoryAdapter);

        updateUnitSpinners("Length");

        spinnerCategory.setOnItemSelectedListener(
                new AdapterView.OnItemSelectedListener() {

                    @Override
                    public void onItemSelected(
                            AdapterView<?> parent,
                            View view,
                            int position,
                            long id
                    ) {

                        updateUnitSpinners(
                                categories[position]
                        );
                    }

                    @Override
                    public void onNothingSelected(
                            AdapterView<?> parent
                    ) {
                    }
                });

        btnConvert.setOnClickListener(v -> convertUnit());
    }

    private void updateUnitSpinners(String category) {

        String[] units;

        switch (category) {

            case "Weight":
                units = weightUnits;
                break;

            case "Temperature":
                units = tempUnits;
                break;

            default:
                units = lengthUnits;
        }

        ArrayAdapter<String> adapter =
                new ArrayAdapter<>(
                        this,
                        android.R.layout.simple_spinner_item,
                        units
                );

        adapter.setDropDownViewResource(
                android.R.layout.simple_spinner_dropdown_item
        );

        spinnerFrom.setAdapter(adapter);
        spinnerTo.setAdapter(adapter);
    }

    private void convertUnit() {

        String input =
                editValue.getText().toString().trim();

        if (input.isEmpty()) {

            Toast.makeText(
                    this,
                    "Enter a value",
                    Toast.LENGTH_SHORT
            ).show();

            return;
        }

        double value;

        try {

            value = Double.parseDouble(input);

        } catch (Exception e) {

            Toast.makeText(
                    this,
                    "Invalid number",
                    Toast.LENGTH_SHORT
            ).show();

            return;
        }

        String category =
                spinnerCategory
                        .getSelectedItem()
                        .toString();

        String from =
                spinnerFrom
                        .getSelectedItem()
                        .toString();

        String to =
                spinnerTo
                        .getSelectedItem()
                        .toString();

        double result = value;

        if(category.equals("Length")) {

            double meters = value;

            if(from.equals("Centimeter"))
                meters = value / 100;

            else if(from.equals("Kilometer"))
                meters = value * 1000;

            if(to.equals("Centimeter"))
                result = meters * 100;

            else if(to.equals("Kilometer"))
                result = meters / 1000;

            else
                result = meters;
        }

        else if(category.equals("Weight")) {

            double kg = value;

            if(from.equals("Gram"))
                kg = value / 1000;

            else if(from.equals("Pound"))
                kg = value * 0.453592;

            if(to.equals("Gram"))
                result = kg * 1000;

            else if(to.equals("Pound"))
                result = kg / 0.453592;

            else
                result = kg;
        }

        else if(category.equals("Temperature")) {

            if(from.equals("Celsius")) {

                if(to.equals("Fahrenheit"))
                    result = value * 9/5 + 32;

                else if(to.equals("Kelvin"))
                    result = value + 273.15;
            }

            else if(from.equals("Fahrenheit")) {

                if(to.equals("Celsius"))
                    result = (value - 32) * 5/9;

                else if(to.equals("Kelvin"))
                    result = (value - 32) * 5/9 + 273.15;
            }

            else {

                if(to.equals("Celsius"))
                    result = value - 273.15;

                else if(to.equals("Fahrenheit"))
                    result = (value - 273.15) * 9/5 + 32;
            }
        }

        txtResult.setText(
                String.format(
                        "Result: %.2f %s",
                        result,
                        to
                )
        );
    }
}
