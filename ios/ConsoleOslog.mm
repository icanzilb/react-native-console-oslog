#import "ConsoleOslog.h"
#import <os/log.h>

@implementation ConsoleOslog

// To export a module named RCTConsoleOSLogModule
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(log:(NSString *)message)
{
  os_log_with_type(OS_LOG_DEFAULT, OS_LOG_TYPE_DEBUG, "%@", message);
}

RCT_EXPORT_METHOD(logDefault:(NSString *)message)
{
  os_log_with_type(OS_LOG_DEFAULT, OS_LOG_TYPE_DEBUG, "%@", message);
}

RCT_EXPORT_METHOD(logInfo:(NSString *)message)
{
  os_log_with_type(OS_LOG_DEFAULT, OS_LOG_TYPE_INFO, "%@", message);
}

RCT_EXPORT_METHOD(logError:(NSString *)message)
{
  os_log_with_type(OS_LOG_DEFAULT, OS_LOG_TYPE_ERROR, "%@", message);
}

RCT_EXPORT_METHOD(logFault:(NSString *)message)
{
  os_log_with_type(OS_LOG_DEFAULT, OS_LOG_TYPE_FAULT, "%@", message);
}

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

@end
