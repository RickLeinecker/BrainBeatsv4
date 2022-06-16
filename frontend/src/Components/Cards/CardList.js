export const CardList = [
    {
        title: 'First song',
        artist: 'First Last',
        time: 'mm:ss',
        data: 'TVRoZAAAAAYAAQACAGBNVHJrAAAAEwD/UQMHRB4A/1gEBAIYCAD/LwBNVHJrAAAAUQD/AwlGTCBLZXlzIDEAkDxkMIA8QACQPmQwgD5AAJBAZDCAQEAAkEFkMIBBQACQQ2QwgENAAJBFZDCARUAAkEdkMIBHQACQSGQwgEhAAP8vAA==',

        // AwlGTCBLZXlzIDEAkDxkMIA8QAD // C
        // AwlGTCBLZXlzIDEAkD1kMIA9QAD // C#
        // AwlGTCBLZXlzIDEAkD5kMIA+QAD // D
        // Base64 ^^^

        /* 

        Hex codes for notes:
        A4:  3964 XXXX 3940
        A#4: 3a64 XXXX 3a40
        B4:  3b64 XXXX 3b40
        C5:  3c64 XXXX 3c40
        C#5: 3d64 XXXX 3d40
        D5:  3e64 XXXX 3e40
        D#5: 3f64 XXXX 3f40
        E5:  4064 XXXX 4040
        F5:  4164 XXXX 4140

        ----------------------------------------------------------------------------------------------

        Hex codes for note lengths (goes where the XXXX is above):
        SIXTEENTH NOTE: 1880
        EIGHTH NOTE:    3080
        QUARTER NOTE:   6080
        HALF NOTE:      814080
        WHOLE NOTE:     830080

        ----------------------------------------------------------------------------------------------
        
        4d54 6864 0000 0006 0001 0002 0060 4d54
        726b 0000 0013 00ff 5103 04f9 c700 ff58
                                 ^    ^ These two control BPM, this is for 184bpm
        0404 0218 0800 ff2f 004d 5472 6b00 0000
        1a00 ff03 0946 4c20 4b65 7973 2031 0090
        3c64 8300 803c 4000 ff2f 00

        4d54 6864 0000 0006 0001 0002 0060 4d54
        726b 0000 0013 00ff 5103 0744 1e00 ff58
                                 ^    ^ These two control BPM, this is for 126bpm
        0404 0218 0800 ff2f 004d 5472 6b00 0000
        1a00 ff03 0946 4c20 4b65 7973 2031 0090
        3c64 814080 3c40 00ff 2f00

        ----------------------------------------------------------------------------------------------

        4d54 6864 0000 0006 0001 0002 0060 4d54
        726b 0000 0013 00ff 5103 0744 1e00 ff58
        0404 0218 0800 ff2f 004d 5472 6b00 0000
        1a00 ff03 0946 4c20 4b65 7973 2031 0090
        3c64 830080 3c40 00ff 2f00
        ^    ^      ^ These 3 numbers control note and length, this is for a C5 whole note.

        4d54 6864 0000 0006 0001 0002 0060 4d54
        726b 0000 0013 00ff 5103 0744 1e00 ff58
        0404 0218 0800 ff2f 004d 5472 6b00 0000
        1a00 ff03 0946 4c20 4b65 7973 2031 0090
        3c64 814080 3c40 00ff 2f00
        ^    ^      ^ These 3 numbers control note and length, this is for a C5 half note.

        4d54 6864 0000 0006 0001 0002 0060 4d54
        726b 0000 0013 00ff 5103 0744 1e00 ff58
        0404 0218 0800 ff2f 004d 5472 6b00 0000
        1900 ff03 0946 4c20 4b65 7973 2031 0090
        3c64 6080 3c40 00ff 2f00 
        ^    ^    ^ These 3 numbers control note and length, this is for a C5 quarter note.

        4d54 6864 0000 0006 0001 0002 0060 4d54
        726b 0000 0013 00ff 5103 0744 1e00 ff58
        0404 0218 0800 ff2f 004d 5472 6b00 0000
        1900 ff03 0946 4c20 4b65 7973 2031 0090
        3c64 3080 3c40 00ff 2f00 
        ^    ^    ^ These 3 numbers control note and length, this is for a C5 eigth note.

        4d54 6864 0000 0006 0001 0002 0060 4d54
        726b 0000 0013 00ff 5103 0744 1e00 ff58
        0404 0218 0800 ff2f 004d 5472 6b00 0000
        1900 ff03 0946 4c20 4b65 7973 2031 0090
        3c64 1880 3c40 00ff 2f00 
        ^    ^    ^ These 3 numbers control note and length, this is for a C5 sixteenth note.

        4d54 6864 0000 0006 0001 0002 0060 4d54
        726b 0000 0013 00ff 5103 0744 1e00 ff58
        0404 0218 0800 ff2f 004d 5472 6b00 0000
        1900 ff03 0946 4c20 4b65 7973 2031 0090
        0034 1880 0040 00ff 2f00 

        C0  = 00
        C#0 = 01
        D0  = 02
        D#0 = 03
        E0  = 04
        E1 = 0c
        
        ----------------------------------------------------------------------------------------------

        */

        // data: '\TVRoZAAAAAYAAQADAGRNVHJrAAAAGgD/AwtMaXR0bGUgTGFtZQD/UQMKLCsA/y8ATVRyawAAAPMA/wMG\
        // THlyaWNzAP8BGEBUTWFyeSBXYXMgQSBMaXR0bGUgTGFtZWT/AQNcTWFL/wEDcnkgGf8BBHdhcyAy/wEC\
        // YSAy/wEDbGl0Mv8BBHRsZSAy/wEFbGFtZSxk/wEEL0xpdDL/AQR0bGUgMv8BBWxhbWUsZP8BBC9MaXQy\
        // /wEEdGxlIDL/AQVsYW1lLGT/AQMvTWFL/wEDcnkgGf8BBHdhcyAy/wECYSAy/wEDbGl0Mv8BBHRsZSAy\
        // /wEFbGFtZSwy/wEDL0EgMv8BA2xpdDL/AQR0bGUgMv8BBWxhbWUgMv8BBHdhcyAy/wEEc2hlIQD/LwBN\
        // VHJrAAAA8gD/AwVNdXNpYwDAC2SQQH9LgEBAAJA+fxmAPkAAkDx/MoA8QACQPn8ygD5AAJBAfzKAQEAA\
        // kEB/MoBAQACQQH9agEBACpA+fzKAPkAAkD5/MoA+QACQPn9agD5ACpBAfzKAQEAAkEN/MoBDQACQQ39a\
        // gENACpBAf0uAQEAAkD5/GYA+QACQPH8ygDxAAJA+fzKAPkAAkEB/MoBAQACQQH8ygEBAAJBAfzKAQEAZ\
        // kEB/GYBAQACQPn8ygD5AAJA+fzKAPkAAkEB/MoBAQACQPn8ygD5AAJA8f2RAZABDZABIf1qAPEAAQEAA\
        // Q0AASEAK/y8A',
    },
    {
        title: 'Second song',
        artist: 'First Last',
        time: 'mm:ss',
        data: '',
    },
    {
        title: 'Third song',
        artist: 'First Last',
        time: 'mm:ss',
        data: '',
    },
    {
        title: 'Forth song',
        artist: 'First Last',
        time: 'mm:ss',
    },
    {
        title: 'Fifth song',
        artist: 'First Last',
        time: 'mm:ss',
        data: '',
    },
    {
        title: 'Sixth song',
        artist: 'First Last',
        time: 'mm:ss',
        data: '',
    },
    {
        title: 'Seventh song',
        artist: 'First Last',
        time: 'mm:ss',
        data: '',
    },
    {
        title: 'Eighth song',
        artist: 'First Last',
        time: 'mm:ss',
        data: '',
    },

]