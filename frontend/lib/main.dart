import 'package:doplearn/pages/welcomescreen.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,

      theme: ThemeData(
        brightness: Brightness.dark, // IMPORTANT
        scaffoldBackgroundColor: Colors.black,
        canvasColor: Colors.black,

        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFFFF0000), brightness: Brightness.dark),

        // Helps reduce white flash during transitions
        pageTransitionsTheme: const PageTransitionsTheme(
          builders: {
            TargetPlatform.android: FadeUpwardsPageTransitionsBuilder(),
            TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
          },
        ),
      ),

      home: const WelcomeScreen(),
    );
  }
}
