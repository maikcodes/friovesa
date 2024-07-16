import { CustomSafeAreaView, CustomWebView } from "../../../../src/components";
import { termsAndConditions as termsAndConditionsInfo } from "../../../../src/constants/appInfo";

export default function TermsAndConditions() {
  return (
    <CustomSafeAreaView>
      <CustomWebView
        htmlContent={`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>${termsAndConditionsInfo}</body><style> h1, h2, h3, h4 { color: #003e80; } </style></html>`}
      ></CustomWebView>
    </CustomSafeAreaView>
  );
}
