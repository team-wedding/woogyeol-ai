"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Search, Star, Wand2 } from "lucide-react";

interface Phrase {
  id: number;
  text: string;
  ranking: number;
  tags: string[];
  category: string;
  likes: number;
}

const samplePhrases: Phrase[] = [
  {
    id: 1,
    text: "혁신적인 솔루션으로 미래를 만들어갑니다",
    ranking: 1,
    tags: ["혁신", "미래", "기술"],
    category: "비즈니스",
    likes: 245,
  },
  {
    id: 2,
    text: "당신의 꿈을 현실로 만드는 파트너",
    ranking: 2,
    tags: ["꿈", "파트너십", "성공"],
    category: "마케팅",
    likes: 189,
  },
  {
    id: 3,
    text: "고객 만족이 우리의 최우선 가치입니다",
    ranking: 3,
    tags: ["고객", "만족", "서비스"],
    category: "서비스",
    likes: 156,
  },
  {
    id: 4,
    text: "지속 가능한 성장을 위한 혁신적 접근",
    ranking: 4,
    tags: ["지속가능", "성장", "혁신"],
    category: "비즈니스",
    likes: 134,
  },
  {
    id: 5,
    text: "함께 만들어가는 더 나은 세상",
    ranking: 5,
    tags: ["협력", "세상", "가치"],
    category: "사회공헌",
    likes: 98,
  },
  {
    id: 6,
    text: "품질과 신뢰로 쌓아온 브랜드 스토리",
    ranking: 6,
    tags: ["품질", "신뢰", "브랜드"],
    category: "마케팅",
    likes: 87,
  },
];

const allTags = Array.from(
  new Set(samplePhrases.flatMap((phrase) => phrase.tags))
);

export default function Component() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPhrase, setSelectedPhrase] = useState<Phrase | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const filteredPhrases = samplePhrases.filter((phrase) => {
    const matchesSearch =
      phrase.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phrase.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => phrase.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handlePhraseSelect = (phrase: Phrase) => {
    setSelectedPhrase(phrase);
    setCustomPrompt(phrase.text);
    setIsEditing(false);
  };

  const handleConfirm = () => {
    if (selectedPhrase) {
      console.log("Selected phrase:", customPrompt);
      setIsOpen(false);
      setSelectedPhrase(null);
      setCustomPrompt("");
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setSelectedPhrase(null);
    setCustomPrompt("");
    setIsEditing(false);
    setSearchTerm("");
    setSelectedTags([]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size="lg">
            <Wand2 className="w-4 h-4 mr-2" />
            문구 선택하기
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>문구 선택</DialogTitle>
            <DialogDescription>
              원하는 문구를 선택하거나 추가 프롬프트로 수정해보세요
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 overflow-hidden">
            {/* 검색 및 필터 */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="문구나 카테고리로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Label className="text-sm font-medium">태그 필터:</Label>
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/80"
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 문구 목록 */}
            <div className="flex-1 overflow-y-auto max-h-60">
              <div className="grid gap-3">
                {filteredPhrases.map((phrase) => (
                  <Card
                    key={phrase.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedPhrase?.id === phrase.id
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                    onClick={() => handlePhraseSelect(phrase)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">
                                #{phrase.ranking}
                              </span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {phrase.category}
                            </Badge>
                          </div>
                          <p className="text-sm mb-2 leading-relaxed">
                            {phrase.text}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {phrase.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-1 text-gray-500">
                              <Heart className="w-3 h-3" />
                              <span className="text-xs">{phrase.likes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 선택된 문구 편집 */}
            {selectedPhrase && (
              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">선택된 문구</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "편집 완료" : "수정하기"}
                  </Button>
                </div>

                {isEditing ? (
                  <div className="space-y-2">
                    <Textarea
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      placeholder="문구를 수정하거나 추가 요청사항을 입력하세요..."
                      className="min-h-20"
                    />
                    <p className="text-xs text-gray-500">
                      예: "더 친근한 톤으로 바꿔주세요", "젊은 세대를 타겟으로
                      수정해주세요"
                    </p>
                  </div>
                ) : (
                  <div className="p-3 bg-gray-50 rounded-md">
                    <p className="text-sm">{customPrompt}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              취소
            </Button>
            <Button onClick={handleConfirm} disabled={!selectedPhrase}>
              선택 완료
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
