import type { LegalPageCopy } from "../legal";

export default {
  pageTitle: "Support | GCSA PassRecover",
  eyebrow: "GCSA PassRecover support",
  title: "Technical support",
  lead: "Get help with installation, file import, recovery tasks, dictionaries, and the Mac App Store edition.",
  updatedLabel: "Support scope",
  updatedDate: "Desktop and Mac App Store editions",
  summaryTitle: "Before contacting us",
  summaryText: "Prepare the app version, macOS version, reproduction steps, and error details that contain no sensitive material.",
  highlights: [
    "Recovery tasks and results stay on your device",
    "Never send passwords, private keys, seed phrases, or target files",
    "We normally reply within two business days"
  ],
  sections: [
    {
      title: "1. Requesting help",
      paragraphs: [
        "Include your GCSA PassRecover version, device and operating-system version, expected result, actual result, and only task-log excerpts that are safe to share.",
        "First check whether the issue still occurs after selecting the file again, re-importing the dictionary, or restarting the app."
      ]
    },
    {
      title: "2. Mac App Store edition",
      paragraphs: [
        "The Mac App Store edition runs in App Sandbox and does not provide direct physical-disk access. Use a disk image, container, document, archive, wallet, or hash file that you are authorized to process.",
        "A local dictionary is copied into the app container when imported. Re-import an older dictionary if it is no longer available."
      ]
    },
    {
      title: "3. Network use and privacy",
      paragraphs: [
        "Online dictionaries are off by default and the app accesses a source only after you enable and configure it. Target files, recovered results, and master passwords are not uploaded to us.",
        "Support email may contain personal information. Send only what is necessary to resolve the issue."
      ]
    },
    {
      title: "4. Contact support",
      paragraphs: [
        "If you still need help, email the address below. Put Security in the subject for a vulnerability report, and do not attach sensitive samples before a secure transfer method is agreed."
      ]
    }
  ],
  contactAction: "contact@gcsa.org"
} satisfies LegalPageCopy;
