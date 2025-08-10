"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {  Star, Shield, Zap, Users, Trophy, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ConnectButton, TransactionButton } from "thirdweb/react"
import { client } from "./client"
import{getContract} from "thirdweb"
import{sepolia} from "thirdweb/chains"
import{getContractMetadata} from "thirdweb/extensions/common"
import { useReadContract } from "thirdweb/react"
import { MediaRenderer } from "thirdweb/react";
import{claimTo} from "thirdweb/extensions/erc721"
import { useActiveAccount } from "thirdweb/react";

export default function NFTClaimPage() {
  const account = useActiveAccount();


  const contract = getContract({
    client: client,
    chain: sepolia,
    address: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as string,
  })
  const { data: ContractMetadata} = useReadContract(
    getContractMetadata,
    {
      contract: contract
    }
  );
console.log(ContractMetadata)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                CryptoArt
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </Link>
              <Link href="#creator" className="text-gray-600 hover:text-gray-900 transition-colors">
                Creator
              </Link>
            </div>
            
            <ConnectButton client={client} theme="light"
            connectButton={{
              label:"Connect Wallet"
            }}
              />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* NFT Image */}
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-3xl blur-xl opacity-30"></div>
                <div className="relative bg-white rounded-3xl p-6 shadow-2xl">
                  {/*<Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Cosmic Genesis NFT"
                    width={400}
                    height={400}
                    className="w-full h-auto rounded-2xl"
                  />*/}
                  <MediaRenderer
                  client={client}
                  src={ContractMetadata?.image}
                  width="400"
                  height="400"
                  style={{
                    borderRadius: "1rem",
                    border: "1px solid #e0e0e0",
                    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    marginLeft: "1rem",
                    marginRight: "1rem",
                    

                  }
                  }
                  />
                  <div className="mt-4 flex items-center justify-between">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      #001
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">Rare</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">Limited Edition</Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  {ContractMetadata?.name}
                  <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Collection
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {ContractMetadata?.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {/*<Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Claim Your NFT
                </Button>*/}
                <TransactionButton
                 
                  transaction={() => claimTo({
                    contract: contract,
                    to: account?.address as string,
                    quantity: BigInt(1),
                  })}
                  onTransactionConfirmed={async() => alert("NFT claimed successfully")}
                  >
                    Claim 1 NFT
                  </TransactionButton>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View on OpenSea
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">1,000</div>
                  <div className="text-sm text-gray-600">Total Supply</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">847</div>
                  <div className="text-sm text-gray-600">Claimed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">FREE</div>
                  <div className="text-sm text-gray-600">Mint Price</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About NFT and Creator */}
      {/* About Collection Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About the Collection</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  The Cosmic Genesis Collection represents the birth of a new digital universe. Each NFT is a unique
                  piece of generative art that combines cosmic themes with cutting-edge algorithmic design.
                </p>
                <p>
                  Created using advanced AI and procedural generation techniques, no two pieces are alike. The
                  collection explores themes of space, time, and the infinite possibilities of digital creation.
                </p>
                <p>
                  Every piece in this collection tells a story of cosmic evolution, from the birth of stars to the
                  formation of galaxies. The intricate details and vibrant colors make each NFT a masterpiece worth
                  collecting.
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  <Badge variant="outline">Generative Art</Badge>
                  <Badge variant="outline">AI-Created</Badge>
                  <Badge variant="outline">Cosmic Theme</Badge>
                  <Badge variant="outline">Utility NFT</Badge>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl blur-xl opacity-20"></div>
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Cosmic Genesis Collection Showcase"
                  width={600}
                  height={500}
                  className="relative w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Section */}
      <section id="creator" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-xl opacity-20"></div>
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="M. Muzammil - Digital Artist"
                  width={400}
                  height={400}
                  className="relative w-full h-auto rounded-full shadow-2xl"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="mb-6">
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white mb-4">Featured Creator</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Meet the Creator</h2>
                <h3 className="text-2xl font-semibold text-purple-600 mb-4">M. Muzammil</h3>
              </div>
              <div className="space-y-4 text-gray-600 mb-8">
                <p>
                  M. Muzammil is a visionary digital artist with over 8 years of experience in generative art and
                  blockchain technology. His innovative approach to combining AI with artistic vision has earned
                  recognition in the global NFT community.
                </p>
                <p>
                  Specializing in cosmic and abstract themes, Muzammil's work has been featured in major digital
                  galleries and collected by thousands of enthusiasts worldwide. His unique style blends mathematical
                  precision with artistic intuition.
                </p>
                <p>
                  The Cosmic Genesis Collection represents the culmination of years of experimentation with procedural
                  generation and represents his most ambitious project to date.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">50K+</div>
                  <div className="text-sm text-gray-600">Artworks Created</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">15K+</div>
                  <div className="text-sm text-gray-600">Collectors</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Portfolio
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Follow on Twitter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features and Benefits */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Holder Benefits</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Owning a Cosmic Genesis NFT unlocks exclusive perks and opportunities in our growing ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Exclusive Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Join our private Discord server with exclusive channels, events, and direct access to the creator.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Future Drops</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get priority access and discounts on all future NFT collections and exclusive releases.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Commercial Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Full commercial usage rights for your NFT, allowing you to create merchandise and derivative works.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle>Staking Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Stake your NFT to earn $COSMIC tokens that can be used for governance and future utilities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Metaverse Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Your NFT comes with 3D assets ready for use in popular metaverse platforms and games.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <ExternalLink className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>IRL Events</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Exclusive invitations to real-world events, gallery showings, and meetups around the globe.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Join the Cosmic Genesis?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Don't miss your chance to own a piece of digital history. Claim your NFT now and become part of our
            exclusive community.
          </p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6">
            <Zap className="w-5 h-5 mr-2" />
            Claim Your NFT Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg"></div>
                <span className="text-xl font-bold">CryptoArt</span>
              </div>
              <p className="text-gray-400">Creating the future of digital art, one NFT at a time.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Collection</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Roadmap
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Rarity
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CryptoArt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
