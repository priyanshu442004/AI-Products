import { motion } from "framer-motion";
import React, {
  useEffect,
  useState,
} from "react";
import { cn } from "../../lib/utils";

export const TypingText = ({
  children,
  as: Component = "div",
  className = "",
  delay = 0,
  duration = 2,
  fontSize = "text-4xl",
  fontWeight = "font-bold",
  color = "text-white",
  letterSpacing = "tracking-wide",
  align = "left",
  loop = false,
  style = {},
}) => {
  const [textContent, setTextContent] = useState("");

  useEffect(() => {
    const extractText = (node) => {
      if (typeof node === "string" || typeof node === "number") {
        return node.toString();
      }
      if (Array.isArray(node)) {
        return node.map(extractText).join("");
      }
      if (
        React.isValidElement(node) &&
        typeof node.props.children !== "undefined"
      ) {
        return extractText(node.props.children);
      }
      return "";
    };

    setTextContent(extractText(children));
  }, [children]);

  // Split text into words to preserve word boundaries
  const words = textContent.split(" ");
  const wordElements = words.map((word, wordIndex) => {
    const wordChars = word.split("").map((char, charIndex) => ({
      char,
      key: `word-${wordIndex}-char-${charIndex}`,
      index: wordIndex * 1000 + charIndex // Ensure unique indices
    }));
    return {
      word,
      chars: wordChars,
      wordIndex,
      isLastWord: wordIndex === words.length - 1
    };
  });

  // Calculate total character count for delay calculation
  const totalChars = textContent.length;
  
  const characterVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: delay + i * (duration / totalChars),
        duration: 0.15,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <Component
      className={cn(
        "inline-flex",
        className,
        fontSize,
        fontWeight,
        color,
        letterSpacing,
        align === "center"
          ? "justify-center text-center"
          : align === "right"
          ? "justify-end text-right"
          : "justify-start text-left"
      )}
      style={{
        ...style,
        wordBreak: 'normal',
        overflowWrap: 'normal',
        hyphens: 'none',
        whiteSpace: 'normal',
        overflow: 'visible',
        height: 'auto',
        maxHeight: 'none',
        minHeight: 'auto',
        lineHeight: '1.25',
        paddingTop: '0.25em',
        paddingBottom: '0.25em',
        transform: 'none'
      }}
    >
      <motion.span
        className="inline-block"
        initial="hidden"
        animate="visible"
        aria-label={textContent}
        role="text"
        style={{
          ...(Object.keys(style).length > 0 ? style : {}),
          wordBreak: 'normal',
          overflowWrap: 'normal',
          hyphens: 'none',
          whiteSpace: 'normal',
          overflow: 'visible',
          height: 'auto',
          maxHeight: 'none',
          minHeight: 'auto',
          lineHeight: '1.25',
          paddingTop: '0.1em',
          paddingBottom: '0.1em',
          transform: 'none'
        }}
      >
        {wordElements.map((wordData, wordIdx) => {
          let charIndex = 0;
          // Calculate starting index for this word
          for (let i = 0; i < wordIdx; i++) {
            charIndex += words[i].length + 1; // +1 for space
          }
          
          return (
            <span key={`word-${wordIdx}`} style={{ 
              whiteSpace: 'nowrap', 
              display: 'inline-block', 
              overflow: 'visible', 
              height: 'auto', 
              maxHeight: 'none',
              lineHeight: '1.25',
              paddingTop: '0.1em',
              paddingBottom: '0.1em',
              transform: 'none'
            }}>
              {wordData.chars.map((charData, charIdx) => {
                const globalIndex = charIndex + charIdx;
                return (
                  <motion.span
                    key={charData.key}
                    className="inline-block"
                    variants={characterVariants}
                    custom={globalIndex}
                    initial="hidden"
                    animate="visible"
                    style={{
                      ...(Object.keys(style).length > 0 ? style : {}),
                      wordBreak: 'normal',
                      overflowWrap: 'normal',
                      hyphens: 'none',
                      lineHeight: '1.25',
                      transform: 'none',
                      verticalAlign: 'baseline'
                    }}
                  >
                    {charData.char}
                  </motion.span>
                );
              })}
              {!wordData.isLastWord && (
                <motion.span
                  key={`space-${wordIdx}`}
                  className="inline-block"
                  variants={characterVariants}
                  custom={charIndex + wordData.word.length}
                  initial="hidden"
                  animate="visible"
                  style={{
                    ...(Object.keys(style).length > 0 ? style : {}),
                    wordBreak: 'normal',
                    overflowWrap: 'normal',
                    hyphens: 'none'
                  }}
                >
                  {"\u00A0"}
                </motion.span>
              )}
            </span>
          );
        })}
      </motion.span>
    </Component>
  );
};

