import OutstationSection from "@/components/landing_features/OutstationSection";
import { branches } from "@/constants/branches";
import { Metadata } from "next";
import React from "react";

interface BranchPageParams {
  branch: string;
}

// Generate metadata for SEO
export async function generateMetadata(props: {
  params: Promise<{ branch: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const branch = branches.find((b) => b.id === params.branch);

  if (!branch) {
    return {
      title: "Branch Not Found",
      description: "The branch you are looking for does not exist.",
    };
  }

  const mainLeader = branch.leadership[0]?.name || "Our Pastor";
  const serviceTimes = ["Sundays, 10:00 AM"];

  return {
    title: `${branch.name} | Church Branch`,
    description: `Welcome to ${branch.name}, located at ${branch.address}. Led by ${mainLeader}. Join us for worship!`,
    openGraph: {
      title: `${branch.name} | Church Branch`,
      description: `Visit ${
        branch.name
      }, led by ${mainLeader}. Service times: ${serviceTimes.join(", ")}.`,
      url: `https://yourdomain.com/branches/${branch.id}`,
      images: [
        {
          url: `/images/branches/${branch.id}.jpg`,
          width: 1200,
          height: 630,
          alt: `${branch.name} Image`,
        },
      ],
    },
  };
}

export default async function BranchPage({
  params,
}: {
  params: Promise<BranchPageParams>;
}) {
  const { branch } = await params;
  return <OutstationSection branchId={branch} />;
}

export async function generateStaticParams() {
  return branches.map((branch) => ({
    branch: branch.id,
  }));
}
