package com.example.calculator;

import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    TextView display;
    StringBuilder input = new StringBuilder();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        display = findViewById(R.id.display);

        int[] numbers = {
                R.id.btn0,R.id.btn1,R.id.btn2,R.id.btn3,
                R.id.btn4,R.id.btn5,R.id.btn6,R.id.btn7,
                R.id.btn8,R.id.btn9
        };

        for(int id : numbers){
            Button b=findViewById(id);
            b.setOnClickListener(v->{
                input.append(b.getText());
                display.setText(input.toString());
            });
        }

        Button dot=findViewById(R.id.btnDot);
        dot.setOnClickListener(v->{
            input.append(".");
            display.setText(input.toString());
        });

        Button plus=findViewById(R.id.btnPlus);
        Button minus=findViewById(R.id.btnMinus);
        Button multiply=findViewById(R.id.btnMultiply);
        Button divide=findViewById(R.id.btnDivide);

        plus.setOnClickListener(v->appendOperator("+"));
        minus.setOnClickListener(v->appendOperator("-"));
        multiply.setOnClickListener(v->appendOperator("*"));
        divide.setOnClickListener(v->appendOperator("/"));

        findViewById(R.id.btnClear).setOnClickListener(v->{
            input.setLength(0);
            display.setText("0");
        });

        findViewById(R.id.btnBack).setOnClickListener(v->{
            if(input.length()>0){
                input.deleteCharAt(input.length()-1);
                display.setText(input.length()==0?"0":input.toString());
            }
        });

        findViewById(R.id.btnEqual).setOnClickListener(v->calculate());
    }

    private void appendOperator(String op){

        if(input.length()==0)
            return;

        char last=input.charAt(input.length()-1);

        if(last=='+'||last=='-'||last=='*'||last=='/')
            return;

        input.append(op);
        display.setText(input.toString());
    }

    private void calculate(){

        try{

            String exp=input.toString();

            char operator=' ';

            if(exp.contains("+")) operator='+';
            else if(exp.contains("-")) operator='-';
            else if(exp.contains("*")) operator='*';
            else if(exp.contains("/")) operator='/';

            String[] arr=exp.split("[+\\-*/]");

            if(arr.length!=2)
                return;

            double a=Double.parseDouble(arr[0]);
            double b=Double.parseDouble(arr[1]);

            double ans=0;

            switch(operator){

                case '+':
                    ans=a+b;
                    break;

                case '-':
                    ans=a-b;
                    break;

                case '*':
                    ans=a*b;
                    break;

                case '/':
                    if(b==0){
                        display.setText("Error");
                        input.setLength(0);
                        return;
                    }
                    ans=a/b;
                    break;
            }

            if(ans==(long)ans)
                display.setText(String.valueOf((long)ans));
            else
                display.setText(String.valueOf(ans));

            input.setLength(0);
            input.append(display.getText());

        }catch(Exception e){
            display.setText("Error");
            input.setLength(0);
        }

    }

}
