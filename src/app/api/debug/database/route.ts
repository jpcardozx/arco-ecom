/**
 * ARCO Database Debug API
 * Professional debugging endpoint for MongoDB operations
 */

import { NextRequest, NextResponse } from 'next/server';
import { mongodbDebugger } from '@/lib/mongodb-debug';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'health';

    switch (action) {
      case 'health':
        const health = await mongodbDebugger.checkHealth();
        return NextResponse.json({
          success: true,
          health
        });

      case 'performance':
        const performance = await mongodbDebugger.monitorPerformance();
        return NextResponse.json({
          success: true,
          performance
        });

      case 'crud-test':
        const crudTest = await mongodbDebugger.testCRUDOperations();
        return NextResponse.json({
          success: true,
          crudTest
        });

      case 'logs':
        const limit = parseInt(searchParams.get('limit') || '50');
        const logs = mongodbDebugger.getOperationLogs(limit);
        return NextResponse.json({
          success: true,
          logs
        });

      case 'report':
        const report = await mongodbDebugger.generateDebugReport();
        return NextResponse.json({
          success: true,
          report
        });

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action. Available: health, performance, crud-test, logs, report'
        }, { status: 400 });
    }

  } catch (error) {
    console.error('Database debug API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();

    switch (action) {
      case 'clear-logs':
        mongodbDebugger.clearLogs();
        return NextResponse.json({
          success: true,
          message: 'Operation logs cleared'
        });

      case 'run-tests':
        const testResults = await mongodbDebugger.testCRUDOperations();
        return NextResponse.json({
          success: true,
          testResults
        });

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action. Available: clear-logs, run-tests'
        }, { status: 400 });
    }

  } catch (error) {
    console.error('Database debug API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}