import {
    Sparkles
} from "lucide-react-native";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, {
    Easing,
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withTiming
} from "react-native-reanimated";

// --- CONSTANTES DE DESIGN ---
const HZ_RED = "#B6192E";
const CARD_WIDTH_L = 152;
const CARD_WIDTH_S = 148;
const CONTENT_BLOCK_HEIGHT = 800;
const TOTAL_CYCLE_DURATION = 18000;

// Geometria do Grid 3x3 (Centralizado no Mockup 330x560)
// Grid Total: 228x228 (3*60 + 2*24)
// Topo do Grid = (560 - 228) / 2 = 166
// Esquerda do Grid = (330 - 228) / 2 = 51
const GRID_START_TOP = 166;
const GRID_START_LEFT = 51;
const ICON_SIZE = 60;
const GAP = 24;

// Posição do Ícone Central (Horazion)
// Row 1, Col 1 (índice 0)
const CENTER_ICON_TOP = GRID_START_TOP + ICON_SIZE + GAP; // 166 + 60 + 24 = 250
const CENTER_ICON_LEFT = GRID_START_LEFT + ICON_SIZE + GAP; // 51 + 60 + 24 = 135

// --- DADOS ---
const IMAGES = {
  workspace:
    "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&w=600&q=80",
  nature:
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&w=600&q=80",
  coffee:
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&w=600&q=80",
  archi:
    "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixlib=rb-4.0.3&w=600&q=80",
  minimal:
    "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixlib=rb-4.0.3&w=600&q=80",
  book_cover_1: "https://covers.openlibrary.org/b/id/8225261-M.jpg",
  book_cover_2: "https://covers.openlibrary.org/b/id/8114686-M.jpg",
  avatar_1:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&w=150&q=80",
  avatar_2:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&q=80",
  avatar_3:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=150&q=80",
};

const RAW_CARDS = [
  {
    id: "c1",
    type: "photo",
    user: "Ana.Design",
    avatar: IMAGES.avatar_1,
    image: IMAGES.workspace,
    caption: "Deep Work.",
    height: 210,
    width: CARD_WIDTH_L,
    x: 8,
    y: 0,
  },
  {
    id: "c4",
    type: "thought",
    user: "Lucas.M",
    avatar: IMAGES.avatar_2,
    text: '"O essencial é invisível."',
    height: 110,
    width: CARD_WIDTH_L,
    x: 8,
    y: 225,
  },
  {
    id: "c6",
    type: "reading",
    user: "Marcos.T",
    avatar: IMAGES.avatar_3,
    bookCover: IMAGES.book_cover_1,
    title: "Essencialismo",
    progress: 85,
    height: 150,
    width: CARD_WIDTH_L,
    x: 8,
    y: 350,
  },
  {
    id: "c7",
    type: "photo",
    user: "Julia.Arq",
    avatar: IMAGES.avatar_1,
    image: IMAGES.archi,
    caption: "Linhas.",
    height: 180,
    width: CARD_WIDTH_L,
    x: 8,
    y: 515,
  },
  {
    id: "c2",
    type: "reading",
    user: "Pedro.Dev",
    avatar: IMAGES.avatar_2,
    bookCover: IMAGES.book_cover_2,
    title: "Hábitos Atômicos",
    progress: 42,
    height: 150,
    width: CARD_WIDTH_S,
    x: 166,
    y: 20,
  },
  {
    id: "c3",
    type: "photo",
    user: "Sofia.L",
    avatar: IMAGES.avatar_3,
    image: IMAGES.nature,
    caption: "Offline.",
    height: 170,
    width: CARD_WIDTH_S,
    x: 166,
    y: 185,
  },
  {
    id: "c5",
    type: "photo",
    user: "Carla.Ar",
    avatar: IMAGES.avatar_1,
    image: IMAGES.coffee,
    caption: "Ritual.",
    height: 190,
    width: CARD_WIDTH_S,
    x: 166,
    y: 370,
  },
  {
    id: "c8",
    type: "photo",
    user: "Rafa.Min",
    avatar: IMAGES.avatar_2,
    image: IMAGES.minimal,
    caption: "Branco.",
    height: 140,
    width: CARD_WIDTH_S,
    x: 166,
    y: 575,
  },
];

const MOCK_DATA = [
  ...RAW_CARDS,
  ...RAW_CARDS.map((c) => ({
    ...c,
    id: c.id + "_dup1",
    y: c.y + CONTENT_BLOCK_HEIGHT,
  })),
];

// --- SUBCOMPONENTES ---
const UserBadge = ({ name, avatar, dark }: any) => (
  <View style={styles.userBadge}>
    <Image source={{ uri: avatar }} style={styles.avatar} />
    {!dark && <Text style={styles.userName}>{name}</Text>}
  </View>
);

const MasonryCard = ({ card }: { card: any }) => {
  const content = () => {
    switch (card.type) {
      case "photo":
        return (
          <View style={styles.cardPhotoContainer}>
            <Image
              source={{ uri: card.image }}
              style={styles.fill}
              resizeMode="cover"
            />
            <View style={styles.captionOverlay}>
              <Text style={styles.captionText}>{card.caption}</Text>
            </View>
            <UserBadge name={card.user} avatar={card.avatar} dark />
          </View>
        );
      case "reading":
        return (
          <View style={styles.cardReadingContainer}>
            <View style={styles.row}>
              <Image
                source={{ uri: card.bookCover }}
                style={styles.bookCover}
                resizeMode="cover"
              />
              <View style={styles.flex1}>
                <Text style={styles.bookTitle}>{card.title}</Text>
                <Text style={styles.bookSubtitle}>Lendo</Text>
              </View>
            </View>
            <View style={styles.progressBarBg}>
              <View
                style={[styles.progressBarFill, { width: `${card.progress}%` }]}
              />
            </View>
          </View>
        );
      case "thought":
        return (
          <View style={styles.cardThoughtContainer}>
            <Text style={styles.thoughtText}>{card.text}</Text>
            <View style={styles.thoughtAvatar}>
              <UserBadge name={card.user} avatar={card.avatar} />
            </View>
          </View>
        );
      default:
        return null;
    }
  };
  return (
    <View
      style={[
        styles.cardBase,
        { width: card.width, height: card.height, top: card.y, left: card.x },
      ]}
    >
      {content()}
    </View>
  );
};

// --- MOCKUP ---
export const PhoneMockupFeed = () => {
  const expandProgress = useSharedValue(0);
  const scrollProgress = useSharedValue(0);
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    const runAnimation = () => {
      expandProgress.value = 0;
      scrollProgress.value = 0;
      contentOpacity.value = 0;

      // Tap (0.3s) -> Expand (1.2s)
      expandProgress.value = withSequence(
        withTiming(0.1, { duration: 300, easing: Easing.out(Easing.quad) }),
        withDelay(
          100,
          withTiming(1, {
            duration: 1200,
            easing: Easing.bezier(0.22, 1, 0.36, 1),
          }),
        ),
      );

      // Splash Content Reveal
      contentOpacity.value = withDelay(1400, withTiming(1, { duration: 800 }));

      // Scroll
      scrollProgress.value = withDelay(
        2000,
        withTiming(1, { duration: 12000, easing: Easing.inOut(Easing.quad) }),
      );

      // Reset
      setTimeout(() => {
        contentOpacity.value = withTiming(0, { duration: 600 });
        setTimeout(() => runAnimation(), 1000);
      }, 15000);
    };

    runAnimation();
  }, []);

  const iconContainerStyle = useAnimatedStyle(() => {
    const p = expandProgress.value;

    if (p <= 0.1) {
      const t = interpolate(p, [0, 0.1], [0, 1]);
      return {
        scale: interpolate(t, [0, 1], [1, 0.9]),
        borderRadius: 16,
        width: ICON_SIZE,
        height: ICON_SIZE,
        top: CENTER_ICON_TOP,
        left: CENTER_ICON_LEFT,
      };
    }

    const t = interpolate(p, [0.1, 1], [0, 1]);
    return {
      scale: 1,
      width: interpolate(t, [0, 1], [ICON_SIZE, 330]),
      height: interpolate(t, [0, 1], [ICON_SIZE, 560]),
      top: interpolate(t, [0, 1], [CENTER_ICON_TOP, 0]),
      left: interpolate(t, [0, 1], [CENTER_ICON_LEFT, 0]),
      borderRadius: interpolate(t, [0, 1], [16, 0]),
    };
  });

  const feedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [
      { translateY: interpolate(scrollProgress.value, [0, 1], [0, -600]) },
    ],
  }));

  const iconSymbolStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      expandProgress.value,
      [0.1, 0.2],
      [1, 0],
      Extrapolation.CLAMP,
    ),
  }));

  const splashStyle = useAnimatedStyle(() => ({
    opacity:
      interpolate(expandProgress.value, [0.8, 1], [0, 1], Extrapolation.CLAMP) *
      (1 - contentOpacity.value),
  }));

  const homeScreenStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      expandProgress.value,
      [0.2, 0.5],
      [1, 0],
      Extrapolation.CLAMP,
    ),
  }));

  return (
    <View style={styles.chassis}>
      <View style={styles.screen}>
        {/* Dynamic Island */}
        <View style={styles.dynamicIsland}>
          <View style={styles.islandDot} />
          <View style={styles.islandBar} />
        </View>

        {/* 1. HOME SCREEN (GRID 3x3) */}
        <Animated.View
          style={[StyleSheet.absoluteFill, styles.homeScreen, homeScreenStyle]}
        >
          {/* Background apps (8 cinzas, 1 buraco no meio) */}
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => {
              const isCenter = row === 1 && col === 1;
              if (isCenter) return null; // Buraco para o Horazion
              return (
                <View
                  key={`${row}-${col}`}
                  style={[
                    styles.appIconPlaceholder,
                    {
                      position: "absolute",
                      top: GRID_START_TOP + row * (ICON_SIZE + GAP),
                      left: GRID_START_LEFT + col * (ICON_SIZE + GAP),
                    },
                  ]}
                />
              );
            }),
          )}
        </Animated.View>

        {/* 2. APP EXPANSÍVEL (Ícone Vermelho -> Tela Branca) */}
        <Animated.View style={[styles.iconContainer, iconContainerStyle]}>
          {/* Símbolo Sparkles (Estado Inicial) */}
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              styles.iconSymbol,
              iconSymbolStyle,
            ]}
          >
            <Sparkles size={32} color="white" />
          </Animated.View>

          {/* Splash Logo (Estado Intermediário) */}
          <Animated.View
            style={[StyleSheet.absoluteFill, styles.splashScreen, splashStyle]}
          >
            <Image
              source={require("../../../assets/images/logo/life.png")}
              style={styles.logoImage}
            />
          </Animated.View>

          {/* Feed Real (Estado Final) */}
          <Animated.View
            style={[StyleSheet.absoluteFill, styles.feedContainer, feedStyle]}
          >
            <View style={styles.headerGradient} />
            <View style={{ paddingTop: 90, flex: 1 }}>
              {MOCK_DATA.map((card) => (
                <MasonryCard key={card.id} card={card} />
              ))}
            </View>
            <View style={styles.footerGradient} />
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
};

// --- STYLESHEET (Para evitar erros de sintaxe e strings soltas) ---
const styles = StyleSheet.create({
  chassis: {
    width: 330,
    height: 560,
    backgroundColor: "#F5F5F7",
    borderRadius: 48,
    padding: 3,
    borderWidth: 1,
    borderColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  screen: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 44,
    overflow: "hidden",
    position: "relative",
  },
  dynamicIsland: {
    position: "absolute",
    top: 20,
    alignSelf: "center",
    width: 90,
    height: 28,
    backgroundColor: "#000",
    borderRadius: 14,
    zIndex: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  islandDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#333" },
  islandBar: { width: 48, height: 6, borderRadius: 3, backgroundColor: "#333" },

  homeScreen: { backgroundColor: "#FAFAFA", alignItems: "center" },
  appIconPlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: "#E5E5E5",
    borderRadius: 16,
  },

  iconContainer: {
    position: "absolute",
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 40,
    overflow: "hidden",
    shadowColor: HZ_RED,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  iconSymbol: {
    backgroundColor: HZ_RED,
    alignItems: "center",
    justifyContent: "center",
  },
  splashScreen: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    zIndex: 50,
  },
  logoImage: { width: 120, height: 50, resizeMode: "contain" },
  feedContainer: { backgroundColor: "#FFF", zIndex: 40 },

  headerGradient: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 100,
    backgroundColor: "#FFF",
    opacity: 0.9,
    zIndex: 20,
  },
  footerGradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 120,
    backgroundColor: "#FFF",
    opacity: 0.9,
    zIndex: 20,
  },

  // Card Styles
  cardBase: {
    position: "absolute",
    backgroundColor: "#FFF",
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    overflow: "hidden",
  },
  cardPhotoContainer: { flex: 1, backgroundColor: "#F0F0F0" },
  fill: { width: "100%", height: "100%" },
  captionOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 16,
    paddingTop: 32,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  captionText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  cardReadingContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
    backgroundColor: "#FFFAF5",
    borderWidth: 1,
    borderColor: "#FFF5EB",
  },
  row: { flexDirection: "row", gap: 12 },
  bookCover: { width: 40, height: 60, borderRadius: 6 },
  flex1: { flex: 1, justifyContent: "center" },
  bookTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 2,
  },
  bookSubtitle: {
    fontSize: 9,
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  progressBarBg: {
    width: "100%",
    height: 4,
    backgroundColor: "#FFE4C4",
    borderRadius: 2,
    overflow: "hidden",
    marginTop: 8,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#F97316",
    borderRadius: 2,
  },

  cardThoughtContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  thoughtText: {
    fontSize: 13,
    color: "#4B5563",
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 20,
  },
  thoughtAvatar: { marginTop: 16, opacity: 0.6, transform: [{ scale: 0.9 }] },

  userBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    position: "absolute",
    top: 14,
    left: 14,
    zIndex: 10,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
  },
  userName: { fontSize: 9, fontWeight: "700", color: "#9CA3AF" },
});
