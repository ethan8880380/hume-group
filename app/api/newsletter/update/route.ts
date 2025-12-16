import { NextRequest, NextResponse } from 'next/server';

interface ClozeEmail {
  value: string;
  work: boolean;
}

interface ClozePhone {
  value: string;
  work: boolean;
}

interface ClozeCustomField {
  id: string;
  type: string;
  value: string;
}

interface ClozeUpdateData {
  emails: ClozeEmail[];
  name?: string;
  phones?: ClozePhone[];
  customFields?: ClozeCustomField[];
  note?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName, phone, gender, birthday, source } = await request.json();

    // Get Cloze credentials
    const clozeApiKey = process.env.CLOZE_API_KEY;
    const clozeUser = process.env.CLOZE_USER_EMAIL;

    if (!clozeApiKey || !clozeUser) {
      console.error('Cloze API credentials not configured');
      return NextResponse.json(
        { error: 'Service not configured' },
        { status: 500 }
      );
    }

    // Build the update data
    const updateData: ClozeUpdateData & { tags?: string[] } = {
      emails: [{
        value: email,
        work: true
      }],
      tags: ['#home-connection']
    };

    // Add name if provided
    if (firstName || lastName) {
      updateData.name = `${firstName || ''} ${lastName || ''}`.trim();
    }

    // Add phone if provided
    if (phone) {
      updateData.phones = [{
        value: phone,
        work: true
      }];
    }

    // Add custom fields for gender and birthday
    const customFields: ClozeCustomField[] = [];
    
    if (gender) {
      customFields.push({
        id: 'gender',
        type: 'keywords',
        value: gender
      });
    }
    
    if (birthday) {
      customFields.push({
        id: 'birthday',
        type: 'date',
        value: birthday
      });
    }

    if (customFields.length > 0) {
      updateData.customFields = customFields;
    }

    // Add note about the update
    updateData.note = `Additional info provided from: ${source || 'Website'} on ${new Date().toISOString()}`;

    console.log('Updating Cloze contact:', { email, updateData });

    // Update the person in Cloze
    const clozeResponse = await fetch('https://api.cloze.com/v1/people/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${clozeApiKey}`,
        'X-Cloze-User': clozeUser,
      },
      body: JSON.stringify(updateData),
    });

    if (!clozeResponse.ok) {
      const errorData = await clozeResponse.text();
      console.error('Cloze API error:', errorData);
      throw new Error(`Cloze API returned ${clozeResponse.status}`);
    }

    const result = await clozeResponse.json();
    console.log('✅ Successfully updated Cloze contact');

    return NextResponse.json(
      { 
        success: true, 
        message: 'Information updated successfully!',
        data: result
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json(
      { error: 'Failed to update information.' },
      { status: 500 }
    );
  }
}





