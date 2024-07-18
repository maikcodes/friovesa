import { aboutUs as aboutUsInfo } from "../../../../src/constants/appInfo";
import { CustomSafeAreaView, CustomWebView } from "../../../../src/components";

export default function AboutUs() {
  return (
    <CustomSafeAreaView>
      <CustomWebView
        htmlContent={`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>${aboutUsInfo}</body><style> h1, h2, h3, h4 { color: #003e80; } img { width: 100%; } body { padding-bottom: 30px; } </style></html>`}
      />
    </CustomSafeAreaView>
  );
}
