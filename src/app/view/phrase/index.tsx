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
import { Heart, Search, Star, Edit3 } from "lucide-react";

interface WeddingPhrase {
  id: number;
  text: string;
  ranking: number;
  tags: string[];
  category: string;
  likes: number;
  style: "classic" | "modern" | "romantic" | "simple";
}

const weddingPhrases: WeddingPhrase[] = [
  {
    id: 1,
    text: "두 사람이 하나 되어 새로운 인생을 시작하려 합니다\n소중한 분들을 모시고 결혼식을 올리고자 하니\n참석하시어 축복해 주시면 감사하겠습니다",
    ranking: 1,
    tags: ["정중한", "전통적", "격식"],
    category: "본문",
    likes: 342,
    style: "classic",
  },
  {
    id: 2,
    text: "사랑하는 두 사람이 만나\n아름다운 약속을 하려고 합니다\n여러분의 따뜻한 축복 속에서\n새로운 시작을 함께해 주세요",
    ranking: 2,
    tags: ["따뜻한", "감성적", "현대적"],
    category: "본문",
    likes: 298,
    style: "romantic",
  },
  {
    id: 3,
    text: "평생을 함께할 반려자를 만나\n사랑의 결실을 맺으려 합니다",
    ranking: 3,
    tags: ["간결한", "우아한"],
    category: "인사말",
    likes: 256,
    style: "simple",
  },
  {
    id: 4,
    text: "서로를 향한 마음이 하나가 되어\n영원한 사랑을 약속하는 자리에\n소중한 분들을 초대합니다",
    ranking: 4,
    tags: ["로맨틱", "초대", "영원"],
    category: "본문",
    likes: 234,
    style: "romantic",
  },
  {
    id: 5,
    text: "두 가족이 하나가 되는 뜻깊은 자리에\n참석하시어 축복해 주시기 바랍니다",
    ranking: 5,
    tags: ["가족", "축복", "정중한"],
    category: "마무리",
    likes: 189,
    style: "classic",
  },
  {
    id: 6,
    text: "오늘의 기쁨을 함께 나누고 싶어\n소중한 분들을 모십니다",
    ranking: 6,
    tags: ["기쁨", "나눔", "친근한"],
    category: "인사말",
    likes: 167,
    style: "modern",
  },
  {
    id: 7,
    text: "사랑으로 맺어진 인연이\n아름다운 결실을 이루려 합니다\n축복의 자리에 함께해 주세요",
    ranking: 7,
    tags: ["인연", "결실", "축복"],
    category: "본문",
    likes: 145,
    style: "romantic",
  },
  {
    id: 8,
    text: "진심으로 감사드리며\n앞으로도 변함없는 사랑과 관심\n부탁드립니다",
    ranking: 8,
    tags: ["감사", "부탁", "정중한"],
    category: "감사인사",
    likes: 123,
    style: "classic",
  },
];

const allTags = Array.from(
  new Set(weddingPhrases.flatMap((phrase) => phrase.tags))
);
const categories = Array.from(
  new Set(weddingPhrases.map((phrase) => phrase.category))
);

export default function Component() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPhrase, setSelectedPhrase] = useState<WeddingPhrase | null>(
    null
  );
  const [customPrompt, setCustomPrompt] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const filteredPhrases = weddingPhrases.filter((phrase) => {
    const matchesSearch =
      phrase.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phrase.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => phrase.tags.includes(tag));
    const matchesCategory =
      !selectedCategory || phrase.category === selectedCategory;
    return matchesSearch && matchesTags && matchesCategory;
  });

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handlePhraseSelect = (phrase: WeddingPhrase) => {
    setSelectedPhrase(phrase);
    setCustomPrompt(phrase.text);
    setIsEditing(false);
  };

  const handleConfirm = () => {
    if (selectedPhrase) {
      console.log("Selected wedding phrase:", customPrompt);
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
    setSelectedCategory("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="bg-rose-500 hover:bg-rose-600 text-white"
          >
            청첩장 문구 선택
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-center">
              청첩장 문구 선택
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              원하는 문구를 선택하거나 맞춤 수정해보세요
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 overflow-hidden">
            {/* 검색 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="문구 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* 필터 */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Label className="text-sm text-gray-700 mr-2">카테고리:</Label>
                <Button
                  variant={selectedCategory === "" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("")}
                  className="h-8 text-xs"
                >
                  전체
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="h-8 text-xs"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <Label className="text-sm text-gray-700 mr-2">스타일:</Label>
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 문구 목록 */}
            <div className="flex-1 overflow-y-auto max-h-60">
              <div className="space-y-3">
                {filteredPhrases.map((phrase) => (
                  <Card
                    key={phrase.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedPhrase?.id === phrase.id
                        ? "ring-2 ring-rose-500 bg-rose-50"
                        : ""
                    }`}
                    onClick={() => handlePhraseSelect(phrase)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-amber-500 fill-current" />
                              <span className="text-sm font-medium">
                                #{phrase.ranking}
                              </span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {phrase.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {phrase.style}
                            </Badge>
                          </div>

                          <p className="text-sm leading-relaxed mb-3 text-gray-800 whitespace-pre-line">
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
                    <Edit3 className="w-4 h-4 mr-1" />
                    {isEditing ? "완료" : "수정"}
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
                      예: "더 친근한 톤으로", "격식을 줄여서", "현대적인
                      표현으로"
                    </p>
                  </div>
                ) : (
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <p className="text-sm whitespace-pre-line">
                      {customPrompt}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              취소
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!selectedPhrase}
              className="bg-rose-500 hover:bg-rose-600"
            >
              선택 완료
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
