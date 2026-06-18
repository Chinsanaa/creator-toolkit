// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "Earnio",
    platforms: [
        .iOS(.v17)
    ],
    products: [
        .library(
            name: "Earnio",
            targets: ["Earnio"]
        ),
    ],
    dependencies: [],
    targets: [
        .target(
            name: "Earnio",
            dependencies: [],
            path: "Sources"
        ),
    ]
)
