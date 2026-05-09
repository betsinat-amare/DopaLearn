import 'package:doplearn/pages/videopage.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

class LanguageSelectionScreen extends StatefulWidget {
  const LanguageSelectionScreen({super.key});

  @override
  State<LanguageSelectionScreen> createState() => _LanguageSelectionScreenState();
}

class _LanguageSelectionScreenState extends State<LanguageSelectionScreen> {
  int? selectedIndex;

  final List<Map<String, String>> languages = [
    {"title": "Amharic", "flag": "assets/country/et.png"},
    {"title": "Afan Oromoo", "flag": "assets/country/et.png"},
    {"title": "English", "flag": "assets/country/us.png"},
    {"title": "Spanish", "flag": "assets/country/es.png"},
    {"title": "Japanese", "flag": "assets/country/jp.png"},
    {"title": "French", "flag": "assets/country/fr.png"},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SvgPicture.asset("assets/dopalearnlogo.svg", height: 42),

              const SizedBox(height: 28),

              const Text(
                "What language would\nyou like to learn?",
                style: TextStyle(color: Colors.white, fontSize: 26, height: 1.25, fontWeight: FontWeight.w500),
              ),

              const SizedBox(height: 26),

              Expanded(
                child: ListView.separated(
                  itemCount: languages.length,
                  separatorBuilder: (_, __) => const SizedBox(height: 14),
                  itemBuilder: (context, index) {
                    final item = languages[index];
                    final isSelected = selectedIndex == index;

                    return GestureDetector(
                      onTap: () {
                        setState(() {
                          selectedIndex = index;
                        });
                      },
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 180),
                        height: 64,
                        padding: const EdgeInsets.symmetric(horizontal: 18),
                        decoration: BoxDecoration(
                          color: isSelected ? const Color(0x14FF1200) : Colors.transparent,
                          borderRadius: BorderRadius.circular(32),
                          border: Border.all(color: isSelected ? const Color(0xFFFF1200) : Colors.white12, width: 1.3),
                        ),
                        child: Row(
                          children: [
                            Image.asset(item["flag"]!, width: 28, height: 28, fit: BoxFit.cover),
                            const SizedBox(width: 14),
                            Text(
                              item["title"]!,
                              style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w500),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),

              const SizedBox(height: 18),

              SizedBox(
                width: double.infinity,
                height: 54,
                child: ElevatedButton(
                  onPressed: selectedIndex == null
                      ? null
                      : () {
                          final selected = languages[selectedIndex!]["title"];
                          debugPrint("Selected language: $selected");
                          Navigator.push(context, MaterialPageRoute(builder: (context) => TikTokVideoPage()));
                        },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFFF1200),
                    disabledBackgroundColor: Colors.white10,
                    elevation: 0,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(40)),
                  ),
                  child: const Text(
                    "Continue",
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: Colors.white),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
