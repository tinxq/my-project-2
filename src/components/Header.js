import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack, IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const socials = [
  { icon: faEnvelope, url: "mailto:hello@example.com" },
  { icon: faGithub, url: "https://github.com/" },
  { icon: faLinkedin, url: "#" },
  { icon: faMedium, url: "https://medium.com" },
  { icon: faStackOverflow, url: "https://stackoverflow.com" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // حالة القائمة للجوال
  const headerRef = useRef(null);

  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false); // أغلق القائمة بعد الضغط
    }
  };

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currScrollPos = window.scrollY;
      const currHeaderElement = headerRef.current;
      if (!currHeaderElement) return;

      if (prevScrollPos > currScrollPos) currHeaderElement.style.transform = "translateY(0)";
      else currHeaderElement.style.transform = "translateY(-200px)";

      prevScrollPos = currScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transition="transform 0.3s ease-in-out"
      backgroundColor="#18181b"
      ref={headerRef}
      zIndex={1000}
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={{ base: 4, md: 16 }}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          {/* روابط التواصل الاجتماعي */}
          <HStack spacing={4}>
            {socials.map(({ icon, url }) => (
              <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={icon} size="2x" />
              </a>
            ))}
          </HStack>

          {/* أيقونة القائمة للجوال */}
          <IconButton
            display={{ base: "block", md: "none" }}
            icon={<HamburgerIcon />}
            onClick={() => setIsOpen(!isOpen)}
            variant="outline"
            colorScheme="pink"
          />

          {/* روابط الأقسام */}
          <HStack
            spacing={8}
            display={{ base: isOpen ? "flex" : "none", md: "flex" }}
            flexDirection={{ base: "column", md: "row" }}
            alignItems={{ base: "flex-start", md: "center" }}
            bg={{ base: "#18181b", md: "transparent" }}
            position={{ base: "absolute", md: "static" }}
            top={{ base: "60px", md: "auto" }}
            right={{ base: 0, md: "auto" }}
            w={{ base: "100%", md: "auto" }}
            px={{ base: 4, md: 0 }}
            py={{ base: 4, md: 0 }}
          >
            <a href="#projects" onClick={handleClick("projects")}>Projects</a>
            <a href="#contact" onClick={handleClick("contactme")}>Contact Me</a>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default Header;
