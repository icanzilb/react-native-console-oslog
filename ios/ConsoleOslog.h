
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNConsoleOslogSpec.h"

@interface ConsoleOslog : NSObject <NativeConsoleOslogSpec>
#else
#import <React/RCTBridgeModule.h>

@interface ConsoleOslog : NSObject <RCTBridgeModule>
#endif

@end
