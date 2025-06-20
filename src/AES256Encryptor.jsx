import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CryptoJS from "crypto-js";

export default function AES256Encryptor() {
  const [encKey, setEncKey] = useState("");
  const [content, setContent] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  const handleEncrypt = () => {
    if (!encKey || !content) {
      alert("ENC_KEY와 CONTENT를 입력하세요.");
      return;
    }

    // SHA-256 해시 생성 (Java와 동일하게)
    const hashedKey = CryptoJS.SHA256(encKey);
    const key = CryptoJS.enc.Hex.parse(hashedKey.toString());

    // AES 암호화 (ECB 모드, IV 없음)
    const encryptedData = CryptoJS.AES.encrypt(content, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    const base64Encoded = encryptedData.toString();
    setEncrypted(base64Encoded);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(encrypted).then(() => {
      setCopySuccess("복사 완료!");
      setTimeout(() => setCopySuccess(""), 2000);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen max-w-screen bg-gray-100 p-10">
      <div className="flex w-full min-w-[1200px] gap-8">
        <Card className="w-1/2 p-4">
          <CardContent>
            <h3 className="text-2xl text-center font-bold mb-4">--- ---</h3>
            <h2 className="text-3xl text-center font-bold mb-4">AES256 암호화 도구</h2>
            <div className="space-y-4">
              <Input
                placeholder="POST_BODY_ENC_KEY 입력"
                value={encKey}
                onChange={(e) => setEncKey(e.target.value)}
              />
              <textarea
                className="w-full border rounded p-2 min-h-[600px] text-sm"
                placeholder="JSON포맷 CONTENT 입력"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Button
                className="w-full py-3 text-lg font-bold text-black bg-blue-300 hover:bg-blue-400"
                onClick={handleEncrypt}
              >
                암호화하기
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="w-1/2 p-4">
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">암호화 결과</h2>
            {encrypted ? (
              <div className="space-y-4">
                <div className="p-2 bg-gray-200 rounded h-[680px] overflow-auto">
                  <p className="text-sm font-mono break-words">{encrypted}</p>
                </div>
                <Button
                  className="w-full py-2 text-md font-bold text-black bg-blue-300 hover:bg-blue-400"
                  onClick={handleCopy}
                >
                  클립보드로 복사
                </Button>
                {copySuccess && (
                  <p className="text-green-500 text-center">{copySuccess}</p>
                )}
              </div>
            ) : (
              <p className="text-gray-500">암호화된 결과가 여기 표시됩니다.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
    
  );

  // return (
  //   <div className="flex items-center justify-center min-h-screen bg-gray-100 p-10">
  //     <div className="flex w-full max-w-6xl gap-8">
  //       <Card className="w-1/2 p-4">
  //         <CardContent>
  //           <h1 className="text-3xl font-bold mb-4">AES256 암호화 도구</h1>
  //           <div className="space-y-4">
  //             <Input
  //               placeholder="ENC_KEY 입력 (32자 이내)"
  //               value={encKey}
  //               onChange={(e) => setEncKey(e.target.value)}
  //             />
  //             <textarea
  //               className="w-full border rounded p-2 min-h-[400px]"
  //               placeholder="CONTENT 입력"
  //               value={content}
  //               onChange={(e) => setContent(e.target.value)}
  //             />
  //             <Button className="w-full py-3 text-lg text-black" onClick={handleEncrypt}>
  //               암호화하기
  //             </Button>
  //           </div>
  //         </CardContent>
  //       </Card>
  //       <Card className="w-1/2 p-4">
  //         <CardContent>
  //           <h2 className="text-2xl font-bold mb-4">암호화 결과</h2>
  //           {encrypted ? (
  //             <div className="p-2 bg-gray-200 rounded h-[450px] overflow-auto">
  //               <p className="text-sm font-mono break-words">{encrypted}</p>
  //             </div>
  //           ) : (
  //             <p className="text-gray-500">암호화된 결과가 여기 표시됩니다.</p>
  //           )}
  //         </CardContent>
  //       </Card>
  //     </div>
  //   </div>
  // );
}
