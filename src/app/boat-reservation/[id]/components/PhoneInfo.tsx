import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type React from "react";
import { Phone } from "lucide-react";
import { PostDetailMember } from "@/types/boatPostType";

export default function PhoneInfo({
  detailMember,
}: {
  detailMember: PostDetailMember;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>예약 문의</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center">
          <div className="bg-sub-2 text-primary p-2 rounded-full mr-3">
            <Phone size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">전화 문의</p>
            <p className="font-medium">{detailMember.phone}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
