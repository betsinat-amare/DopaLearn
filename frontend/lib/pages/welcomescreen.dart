import 'package:doplearn/pages/login.dart';
import 'package:doplearn/pages/register.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class WelcomeScreen extends StatefulWidget {
  const WelcomeScreen({super.key});

  @override
  State<WelcomeScreen> createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> {
  int selectedLanguage = 0;

  final List<String> languages = ["English", "አማርኛ", "Afaan Oromoo"];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: SingleChildScrollView(
        child: Column(
          children: [
            // TOP RED SECTION
            Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 24),
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [Color(0xFFFF1200), Color(0xFFFF1200), Colors.black],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  stops: [0.0, 0.7, 1.0],
                ),
              ),
              child: Column(
                children: [
                  const SizedBox(height: 20),

                  // LOGO
                  SvgPicture.asset(
                    "assets/dopalearnlogo.svg",
                    height: 90,
                    colorFilter: const ColorFilter.mode(Colors.white, BlendMode.srcIn),
                  ),

                  const SizedBox(height: 18),

                  // APP NAME
                  const Text(
                    "DopaLearn",
                    style: TextStyle(color: Colors.white, fontSize: 42, fontWeight: FontWeight.bold),
                  ),

                  const SizedBox(height: 6),

                  const Text(
                    "Learn one swipe at a time.",
                    style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w400),
                  ),

                  const SizedBox(height: 80),
                ],
              ),
            ),

            // BOTTOM CONTENT
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 26, vertical: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    "Your Daily Scroll\nJust Got Smarter",
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 38,
                      height: 1.2,
                      fontWeight: FontWeight.w500,
                      fontFamily: "Serif",
                    ),
                  ),

                  const SizedBox(height: 20),

                  const Text(
                    "Watch fast, fun lessons designed to\nteach real skills in under a minute.",
                    style: TextStyle(color: Colors.white70, fontSize: 19, height: 1.5),
                  ),

                  const SizedBox(height: 40),

                  // REGISTER BUTTON
                  SizedBox(
                    width: double.infinity,
                    height: 58,
                    child: ElevatedButton(
                      onPressed: () {
                        Navigator.push(context, MaterialPageRoute(builder: (context) => RegisterScreen()));
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFFFF1200),
                        foregroundColor: Colors.white,
                        elevation: 0,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(40)),
                      ),
                      child: const Text("Register", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                    ),
                  ),

                  const SizedBox(height: 16),

                  // LOGIN BUTTON
                  SizedBox(
                    width: double.infinity,
                    height: 58,
                    child: OutlinedButton(
                      onPressed: () {
                        Navigator.push(context, MaterialPageRoute(builder: (context) => const LoginScreen()));
                      },
                      style: OutlinedButton.styleFrom(
                        side: const BorderSide(color: Colors.white30),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(40)),
                      ),
                      child: const Text(
                        "Log in",
                        style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w600),
                      ),
                    ),
                  ),

                  const SizedBox(height: 28),

                  // LANGUAGE SELECTOR
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: List.generate(
                      languages.length,
                      (index) => Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 6),
                        child: GestureDetector(
                          onTap: () {
                            setState(() {
                              selectedLanguage = index;
                            });
                          },
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 10),
                            decoration: BoxDecoration(
                              color: selectedLanguage == index ? const Color(0xFFFF1200) : Colors.transparent,
                              borderRadius: BorderRadius.circular(30),
                              border: Border.all(
                                color: selectedLanguage == index ? const Color(0xFFFF1200) : Colors.white38,
                              ),
                            ),
                            child: Text(
                              languages[index],
                              style: TextStyle(
                                color: Colors.white,
                                fontWeight: selectedLanguage == index ? FontWeight.bold : FontWeight.w500,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),

                  const SizedBox(height: 30),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
