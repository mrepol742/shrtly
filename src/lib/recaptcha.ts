import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";

const projectId = process.env.GOOGLE_CLOUD_PROJECT || "";
const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
const action = "shortlink";

const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS
  ? JSON.parse(
      Buffer.from(
        process.env.GOOGLE_APPLICATION_CREDENTIALS,
        "base64",
      ).toString("utf-8"),
    )
  : undefined;
const client = new RecaptchaEnterpriseServiceClient({ credentials });

export async function recaptcha(token: string): Promise<boolean> {
  if (!token) return false;

  try {
    const [assessment] = await client.createAssessment({
      parent: client.projectPath(projectId),
      assessment: {
        event: {
          token,
          siteKey,
          expectedAction: action,
        },
      },
    });

    const tokenProps = assessment.tokenProperties;
    const score = assessment.riskAnalysis?.score ?? 0;

    if (!tokenProps?.valid || tokenProps.action !== action) {
      return false;
    }

    return score >= 0.5;
  } catch (err) {
    console.error("Failed to validate captcha:", err);
    return false;
  }
}
