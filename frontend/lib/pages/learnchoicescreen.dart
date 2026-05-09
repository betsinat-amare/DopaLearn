import 'package:doplearn/pages/languageselectionscreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class LearnScreen extends StatefulWidget {
  const LearnScreen({super.key});

  @override
  State<LearnScreen> createState() => _LearnScreenState();
}

class _LearnScreenState extends State<LearnScreen> {
  int? selectedIndex;

  final List<Map<String, dynamic>> options = [
    {"title": "Language", "icon": Icons.chat_bubble_outline, "color": const Color(0xFF39D98A)},
    {"title": "Maths", "icon": Icons.calculate_outlined, "color": const Color(0xFFE25C7D)},
    {"title": "Cooking", "icon": Icons.restaurant, "color": const Color(0xFFFFC7A6)},
    {"title": "Coding", "icon": Icons.code, "color": const Color(0xFF3AA0FF)},
  ];

  String name = "Yosen";

  void _showComingSoonSheet(BuildContext context, String title) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: const Color(0xFF141414),
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (context) {
        return SizedBox(
          width: double.infinity,
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 30), // removed horizontal padding
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  height: 4,
                  width: 40,
                  decoration: BoxDecoration(color: Colors.white24, borderRadius: BorderRadius.circular(10)),
                ),
                const SizedBox(height: 25),
                const Icon(Icons.lock_clock_outlined, color: Color(0xFFFF1200), size: 50),
                const SizedBox(height: 16),
                Text(
                  "$title is Coming Soon!",
                  style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 8),
                const Text(
                  "We're working hard to bring this course to you.\nStay tuned for updates!",
                  textAlign: TextAlign.center,
                  style: TextStyle(color: Colors.white70, fontSize: 14),
                ),
                const SizedBox(height: 30),
              ],
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // LOGO
              SvgPicture.asset("assets/dopalearnlogo.svg", height: 40),

              // SvgPicture.asset("assets/country/et.svg", height: 40),
              const SizedBox(height: 20),

              RichText(
                text: TextSpan(
                  style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
                  children: [
                    const TextSpan(
                      text: "What would you like\nto learn, ",
                      style: TextStyle(color: Colors.white),
                    ),
                    TextSpan(
                      text: "$name?",
                      style: const TextStyle(color: Color(0xFFFF1200)),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 30),

              // GRID
              Expanded(
                child: GridView.builder(
                  itemCount: options.length,
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    crossAxisSpacing: 14,
                    mainAxisSpacing: 14,
                    childAspectRatio: 1,
                  ),
                  itemBuilder: (context, index) {
                    final item = options[index];
                    final isSelected = selectedIndex == index;
                    final bool isLocked = item["title"] != "Language";

                    return GestureDetector(
                      onTap: () {
                        if (isLocked) {
                          _showComingSoonSheet(context, item["title"]);
                        } else {
                          setState(() {
                            selectedIndex = index;
                          });
                        }
                      },
                      child: Stack(
                        children: [
                          AnimatedContainer(
                            width: double.infinity,
                            height: double.infinity,
                            duration: const Duration(milliseconds: 200),
                            decoration: BoxDecoration(
                              color: isSelected ? item["color"].withOpacity(0.25) : const Color(0xFF141414),
                              borderRadius: BorderRadius.circular(18),
                              border: Border.all(color: isSelected ? item["color"] : Colors.white12, width: 1.5),
                            ),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(item["icon"], color: item["color"], size: 40),
                                const SizedBox(height: 12),
                                Text(
                                  item["title"],
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontSize: 16,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          if (isLocked)
                            const Positioned(
                              bottom: 12,
                              right: 12,
                              child: Icon(Icons.lock_outline, color: Colors.white38, size: 20),
                            ),
                        ],
                      ),
                    );
                  },
                ),
              ),

              const SizedBox(height: 10),

              // CONTINUE BUTTON
              SizedBox(
                width: double.infinity,
                height: 55,
                child: ElevatedButton(
                  onPressed: selectedIndex == null
                      ? null
                      : () {
                          Navigator.push(context, MaterialPageRoute(builder: (context) => LanguageSelectionScreen()));
                        },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFFF1200),
                    disabledBackgroundColor: Colors.white12,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(40)),
                  ),
                  child: const Text(
                    "Continue",
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
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
