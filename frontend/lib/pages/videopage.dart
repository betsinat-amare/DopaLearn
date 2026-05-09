import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';

class TikTokVideoPage extends StatefulWidget {
  const TikTokVideoPage({super.key});

  @override
  State<TikTokVideoPage> createState() => _TikTokVideoPageState();
}

class _TikTokVideoPageState extends State<TikTokVideoPage> {
  final PageController _pageController = PageController();

  final List<String> videos = List.generate(10, (index) => "assets/videos/jpshort.mp4");

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: PageView.builder(
        controller: _pageController,
        scrollDirection: Axis.vertical,
        itemCount: videos.length,
        itemBuilder: (context, index) {
          return VideoItem(key: ValueKey(index), assetPath: videos[index]);
        },
      ),
    );
  }
}

class VideoItem extends StatefulWidget {
  final String assetPath;

  const VideoItem({super.key, required this.assetPath});

  @override
  State<VideoItem> createState() => _VideoItemState();
}

class _VideoItemState extends State<VideoItem> {
  late VideoPlayerController _controller;

  bool isLiked = false;

  @override
  void initState() {
    super.initState();

    _controller = VideoPlayerController.asset(widget.assetPath)
      ..initialize().then((_) {
        if (!mounted) return;
        setState(() {});
        _controller
          ..setLooping(true)
          ..play();
      });
  }

  void _togglePlayPause() {
    if (_controller.value.isPlaying) {
      _controller.pause();
    } else {
      _controller.play();
    }
    setState(() {});
  }

  void _toggleLike() {
    setState(() {
      isLiked = !isLiked;
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        // VIDEO WITH GESTURES
        GestureDetector(
          onTap: _togglePlayPause,
          onDoubleTap: _toggleLike,
          child: Center(
            child: _controller.value.isInitialized
                ? SizedBox.expand(
                    child: FittedBox(
                      fit: BoxFit.cover,
                      child: SizedBox(
                        width: _controller.value.size.width,
                        height: _controller.value.size.height,
                        child: VideoPlayer(_controller),
                      ),
                    ),
                  )
                : const Center(child: CircularProgressIndicator(color: Colors.white)),
          ),
        ),

        // RIGHT SIDE FAVORITE BUTTON ONLY
        Positioned(
          right: 16,
          bottom: 120,
          child: IconButton(
            onPressed: _toggleLike,
            icon: Icon(
              isLiked ? Icons.favorite : Icons.favorite_border,
              color: isLiked ? Colors.red : Colors.white,
              size: 40,
            ),
          ),
        ),

        // BOTTOM TEXT
        const Positioned(
          left: 16,
          bottom: 40,
          child: Text("@demo_user • jpshort.mp4", style: TextStyle(color: Colors.white, fontSize: 16)),
        ),
      ],
    );
  }
}
