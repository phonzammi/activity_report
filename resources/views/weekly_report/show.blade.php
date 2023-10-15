<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    {{-- <meta http-equiv="X-UA-Compatible" content="ie=edge"> --}}
    @vite('resources/css/app.css')
    {{-- <link rel="stylesheet" href="{{ asset('build/assets/app-469f6f4c.css') }}"> --}}

    <style>
        .page-break {
            page-break-after: always;
        }
    </style>
    <title>Print/Export Weekly Report</title>
</head>

<body class="text-xs text-black-2 bg-white">
    <div class="mx-2 my-10 border-2 border-black-2">
        <div class="flex justify-between items-center mx-4 my-6 ">
            <div class="flex-1">
                <img class="rounded-md h-20 mr-auto ml-2" src={{ $weekly_report->issuedBy->company->company_logo_url }}
                    alt={{ $weekly_report->project->client->name }} />
            </div>
            <div class="flex-1 text-center">
                <p class="text-2xl">DAILY ACTIVITY REPORT</p>
                <p class="text-2xl">CONSTRUCTION</p>
            </div>
            <div class="flex-1 text-right">
                <img class="rounded-md h-20 ml-auto mr-2" src={{ $weekly_report->project->client->client_logo_url }}
                    alt={{ $weekly_report->project->client->name }} />
            </div>
        </div>

        <p class=" font-semibold uppercase bg-blue-200 border-y border-black-2 text-center">
            {{ $weekly_report->project->name }}
        </p>

        <div class="relative overflow-x-auto mb-6">
            <table class="w-full font-semibold text-left">
                <tbody>
                    <tr class="border-b border-black-2">
                        <td class="whitespace-nowrap pl-10">
                            Location
                        </td>
                        <td class="whitespace-nowrap">
                            : {{ $weekly_report->project->location }}
                        </td>
                        <td class="whitespace-nowrap pl-10">
                            Report No.
                        </td>
                        <td class="whitespace-nowrap">
                            : {{ $weekly_report->report_number }}
                        </td>
                    </tr>
                    <tr class="border-b border-black-2">
                        <td class="whitespace-nowrap pl-10">
                            Client Name
                        </td>
                        <td class="whitespace-nowrap">
                            : {{ $weekly_report->project->client->name }}
                        </td>
                        <td class="whitespace-nowrap pl-10 ">
                            Scope Of Work
                        </td>
                        <td class="whitespace-nowrap">
                            : {{ $weekly_report->project->scope_of_work }}
                        </td>
                    </tr>
                    <tr class="border-b border-black-2">
                        <td class="whitespace-nowrap pl-10">Date</td>
                        <td class="whitespace-nowrap">
                            : {{ $weekly_report->created_at->format('l, F j, Y') }}
                        </td>
                        <td class="whitespace-nowrap pl-10 ">
                            Working Hours
                        </td>
                        <td class="whitespace-nowrap">
                            :
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="flex justify-center border-t-2 border-black-2">
            <div class="grow w-2/3 text-center border-r-2 border-black-2">
                <p class="font-semibold bg-blue-200">
                    PERSONEL
                </p>
                <table class="w-full ">
                    <thead class="h-12 bg-gray-300 border-y border-black-2">
                        <tr>
                            <th class="w-4 px-1 align-middle border-r border-black-2" rowSpan="2" scope="col">
                                No.
                            </th>
                            <th class="px-1 align-middle border-r border-black-2" rowSpan="2" scope="col">
                                Description
                            </th>
                            <th class="px-1 align-middle border-r border-black-2" rowSpan="2" scope="col">
                                Unit
                            </th>
                            <th class="px-1 align-middle border-r border-black-2" rowSpan="2" scope="col">
                                Today
                            </th>

                            <th class="px-1  align-middle border-r border-b border-black-2" colSpan="4"
                                scope="colgroup">
                                ManHours
                            </th>
                            <th class="px-1 align-middle" rowSpan="2" scope="col">
                                Remarks
                            </th>
                        </tr>

                        <tr>
                            <th class="px-1  align-middle border-r border-black-2" scope="col">
                                Unit
                            </th>
                            <th class="px-1  align-middle border-r border-black-2" scope="col">
                                Prev.
                            </th>
                            <th class="w-16 px-1  align-middle border-r border-black-2" scope="col">
                                Weekly Total
                            </th>
                            <th class="px-1  align-middle border-r border-black-2" scope="col">
                                Cum
                            </th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        <tr class="border-b border-black-2">
                            <th class="border-r border-black-2 font-semibold" scope="row">
                                A
                            </th>
                            <td colSpan="8" class="px-1 text-left font-semibold">
                                Indirect
                            </td>
                        </tr>
                        @foreach ($indirect_personels as $personel)
                            <tr class="border-b border-black-2">
                                <td class="border-r border-black-2">
                                    {{ $loop->iteration }}
                                </td>
                                <td class="px-2 text-left border-r border-black-2 whitespace-nowrap">
                                    {{ $personel->personel_name }}
                                </td>
                                <td class="border-r border-black-2">
                                    {{ $personel->unit }}
                                </td>
                                <td class="border-r border-black-2">
                                    {{ $personel->today }}
                                </td>
                                <td class="border-r border-black-2">
                                    {{ $personel->manhours_unit }}
                                </td>
                                <td class="border-r border-black-2">
                                    {{ $personel->manhours_prev }}
                                </td>
                                <td class="border-r border-black-2">
                                    {{ $personel->manhours_daily_total }}
                                </td>
                                <td class="border-r border-black-2">
                                    {{ $personel->manhours_cum }}
                                </td>
                                <td>{{ $personel->remarks }}</td>
                            </tr>
                        @endforeach
                        {{-- Total Indirect --}}
                        <tr class="bg-blue-200 border-b border-black-2">
                            <td></td>
                            <td class="px-1 text-right border-r border-black-2 whitespace-nowrap">
                                Total Indirect
                            </td>
                            <td></td>
                            <td class="border-r border-black-2">
                                {{ $weekly_report->indirect_personels_today_sum }}
                            </td>
                            <td class="border-r border-black-2"></td>
                            <td class="border-r border-black-2">
                                {{ $weekly_report->indirect_personels_manhours_prev_sum }}
                            </td>
                            <td class="border-r border-black-2">
                                {{ $weekly_report->indirect_personels_manhours_weekly_total_sum }}
                            </td>
                            <td class="border-r border-black-2">
                                {{ $weekly_report->indirect_personels_manhours_cum_sum }}
                            </td>
                            <td></td>
                        </tr>
                        <tr class="border-b border-black-2">
                            <th class="border-r border-black-2 font-semibold" scope="row">
                                B
                            </th>
                            <td colSpan="8" class="px-1 text-left font-semibold">
                                Direct
                            </td>
                        </tr>
                        @foreach ($direct_personels as $personel)
                            <tr class="border-b border-black-2">
                                <td class="border-r border-black-2">
                                    {{ $loop->iteration }}
                                </td>
                                <td class="px-2 text-left border-r border-black-2 whitespace-nowrap">
                                    {{ $personel->personel_name }}
                                </td>
                                <td class="border-r border-black-2">
                                    {{ $personel->unit }}
                                </td>
                                <td class="border-r border-black-2">
                                    {{ $personel->today }}
                                </td>
                                <td class="border-r border-black-2">
                                    {{ $personel->manhours_unit }}
                                </td>
                                <td class="border-r border-black-2">
                                    {{ $personel->manhours_prev }}
                                </td>
                                <td class="border-r border-black-2">
                                    {{ $personel->manhours_daily_total }}
                                </td>
                                <td class="border-r border-black-2">
                                    {{ $personel->manhours_cum }}
                                </td>
                                <td>{{ $personel->remarks }}</td>
                            </tr>
                        @endforeach
                        {{-- Total Direct --}}
                        <tr class="bg-blue-200 border-b border-black-2">
                            <td></td>
                            <td class="px-1 text-right border-r border-black-2 whitespace-nowrap">
                                Total Direct
                            </td>
                            <td></td>
                            <td class="border-r border-black-2">
                                {{ $weekly_report->direct_personels_today_sum }}
                            </td>
                            <td class="border-r border-black-2"></td>
                            <td class="border-r border-black-2">
                                {{ $weekly_report->direct_personels_manhours_prev_sum }}
                            </td>
                            <td class="border-r border-black-2">
                                {{ $weekly_report->direct_personels_manhours_weekly_total_sum }}
                            </td>
                            <td class="border-r border-black-2">
                                {{ $weekly_report->direct_personels_manhours_cum_sum }}
                            </td>
                            <td></td>
                        </tr>

                        {{-- Total Manpower --}}
                        <tr class="bg-blue-200 border-b border-black-2">
                            <td></td>
                            <td class="text-right pr-2 border-r border-black-2 whitespace-nowrap">
                                Total Manpower
                            </td>
                            <td></td>
                            <td class="border-r border-black-2">
                                {{ $weekly_report->personels_today_sum }}
                            </td>
                            <td class="border-r border-black-2"></td>
                            <td class="border-r border-black-2">
                                {{ $weekly_report->personels_manhours_prev_sum }}
                            </td>
                            <td class="border-r border-black-2">
                                {{ $weekly_report->personels_manhours_weekly_total_sum }}
                            </td>
                            <td class="border-r border-black-2">
                                {{ $weekly_report->personels_manhours_cum_sum }}
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="grow w-1/3 text-center border-r-2 border-black-2">
                <p class=" font-semibold bg-blue-200">
                    HSE
                </p>
                <table class="w-full">
                    <thead class="h-12 bg-gray-300 border-y border-black-2">
                        <tr>
                            <th class=" text-center align-middle border-b border-black-2" colSpan="4"
                                scope="colgroup">
                                HSE Statistics
                            </th>
                        </tr>

                        <tr>
                            <th class="w-4 px-1 text-center align-middle border-r border-black-2" scope="col">
                                No.
                            </th>
                            <th class="px-1 text-center align-middle border-r border-black-2" scope="col">
                                Description
                            </th>
                            <th class="px-1 text-center align-middle border-r border-black-2" scope="col">
                                Unit
                            </th>
                            <th class="px-1 text-center align-middle border-black-2" scope="col">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($weekly_report->hseStatistics as $hse_statistic)
                            <tr class="border-b border-black-2">
                                <td class="border-r border-black-2">
                                    {{ $loop->iteration }}
                                </td>
                                <td class="pl-2 text-left border-r whitespace-nowrap border-black-2">
                                    {{ $hse_statistic->description }}
                                </td>
                                <td class="border-r border-black-2">
                                    {{ $hse_statistic->unit }}
                                </td>
                                <td>{{ $hse_statistic->total }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            <div class="grow w-1/3 text-center">
                <p class=" font-semibold bg-blue-200">
                    EQUIPMENT
                </p>
                <table class="w-full">
                    <thead class="h-12 bg-gray-300 border-y border-black-2">
                        <tr>
                            <th class="w-4 px-1 text-center align-middle border-r border-black-2" scope="col">
                                No.
                            </th>
                            <th class="px-1 text-center align-middle border-r border-black-2" scope="col">
                                Equipment & Tools
                            </th>
                            <th class="px-1 text-center align-middle border-r border-black-2" scope="col">
                                Unit
                            </th>
                            <th class="px-1 text-center align-middle border-black-2" scope="col">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($weekly_report->equipment as $equipment)
                            <tr class="border-b border-black-2">
                                <td class="border-r border-black-2">
                                    {{ $loop->iteration }}
                                </td>
                                <td class="pl-2 text-left border-r border-black-2">
                                    {{ $equipment->description }}
                                </td>
                                <td class="border-r border-black-2">
                                    {{ $equipment->unit }}
                                </td>
                                <td>{{ $equipment->total }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    {{-- <div class="page-break"></div> --}}

    <div class="mx-2 my-10 break-before-page">
        <div class="border-2 border-black-2">

            <div class="flex justify-between items-center mx-4 my-6 ">
                <div class="flex-1">
                    <img class="rounded-md h-20 mr-auto ml-2"
                        src={{ $weekly_report->issuedBy->company->company_logo_url }}
                        alt={{ $weekly_report->project->client->name }} />
                </div>
                <div class="flex-1 text-center">
                    <p class="text-2xl">DAILY ACTIVITY REPORT</p>
                    <p class="text-2xl">CONSTRUCTION</p>
                </div>
                <div class="flex-1 text-right">
                    <img class="rounded-md h-20 ml-auto mr-2"
                        src={{ $weekly_report->project->client->client_logo_url }}
                        alt={{ $weekly_report->project->client->name }} />
                </div>
            </div>

            <p class=" font-semibold uppercase bg-blue-200 border-y border-black-2 text-center">
                {{ $weekly_report->project->name }}
            </p>

            <div class="relative overflow-x-auto mb-6">
                <table class="w-full font-semibold text-left">
                    <tbody>
                        <tr class="border-b border-black-2">
                            <td class="whitespace-nowrap pl-10">
                                Location
                            </td>
                            <td class="whitespace-nowrap">
                                : {{ $weekly_report->project->location }}
                            </td>
                            <td class="whitespace-nowrap pl-10">
                                Report No.
                            </td>
                            <td class="whitespace-nowrap">
                                : {{ $weekly_report->report_number }}
                            </td>
                        </tr>
                        <tr class="border-b border-black-2">
                            <td class="whitespace-nowrap pl-10">
                                Client Name
                            </td>
                            <td class="whitespace-nowrap">
                                : {{ $weekly_report->project->client->name }}
                            </td>
                            <td class="whitespace-nowrap pl-10 ">
                                Scope Of Work
                            </td>
                            <td class="whitespace-nowrap">
                                : {{ $weekly_report->project->scope_of_work }}
                            </td>
                        </tr>
                        <tr class="border-b border-black-2">
                            <td class="whitespace-nowrap pl-10">Date</td>
                            <td class="whitespace-nowrap">
                                : {{ $weekly_report->created_at->format('l, F j, Y') }}
                            </td>
                            <td class="whitespace-nowrap pl-10 ">
                                Working Hours
                            </td>
                            <td class="whitespace-nowrap">
                                :
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        {{-- <div class=""> --}}
        <table class="w-full">
            <thead class="border-2 border-black-2">
                <tr>
                    <th class="bg-blue-200 text-center font-semibold align-middle border-b border-black-2"
                        colSpan="8" scope="colgroup">
                        ACTIVITIES
                    </th>
                </tr>

                <tr class="bg-gray-300">
                    <th class="w-4 px-1 py-1 align-middle border-r border-black-2" scope="col">
                        No.
                    </th>
                    <th class="w-52 px-1 py-1 align-middle border-r border-black-2" scope="col">
                        Today activities
                    </th>
                    <th class="w-32 px-1 py-1 align-middle border-r border-black-2" scope="col" colSpan="3">
                        QTY
                    </th>
                    <th class="w-16 px-1 py-1 align-middle border-r border-black-2" scope="col">
                        Volume
                    </th>
                    <th class="w-16 px-1 py-1 align-middle border-r border-black-2" scope="col">
                        Unit
                    </th>
                    <th class="w-96 px-2 py-1 align-middle" scope="col">
                        Documentation
                    </th>
                </tr>
            </thead>
            <tbody class="">
                @foreach ($weekly_report->activities as $activity)
                    <tr class="border-x-2 border-b border-black-2">
                        <th class="border-r border-black-2" scope="row">
                            {{ $loop->iteration }}
                        </th>
                        <td class="px-1 border-r border-black-2">
                            {{ $activity->description }}
                        </td>
                        <td class="w-16 text-center border-r border-black-2">
                            {{ $activity->qty1 }}
                        </td>
                        <td class="w-16 text-center border-r border-black-2">
                            {{ $activity->qty2 }}
                        </td>
                        <td class="w-16 text-center border-r border-black-2">
                            {{ $activity->qty3 }}
                        </td>
                        <td class="text-center border-r border-black-2">
                            {{ $activity->volume }}
                        </td>
                        <td class="text-center border-r border-black-2">
                            {{ $activity->unit }}
                        </td>
                        {{-- <td class="">
                            @if ($activity->documentations->count() > 0)
                                <div
                                    class="grid gap-2 m-1 {{ $activity->documentations->count() >= 2 ? 'grid-cols-2' : 'grid-cols-1' }} ">
                                    @foreach ($activity->documentations as $documentation)
                                        <div class="col-auto relative">
                                            <img class="mx-auto rounded-md {{ $activity->documentations->count() > 1 ? 'min-h-full' : 'w-1/2' }}"
                                                src={{ route('daily-reports.activities.documentations', [$activity->daily_report_id, $activity, $documentation->title]) }}
                                                alt={{ $documentation->title }} />
                                        </div>
                                    @endforeach
                                </div>
                            @endif
                        </td> --}}
                        <td @class([
                            'h-40 text-center' => $activity->documentations->count() == 0,
                        ])>
                            @if ($activity->documentations->count() > 0)
                                <div
                                    class="grid gap-2 m-1 {{ $activity->documentations->count() >= 2 ? 'grid-cols-2' : 'grid-cols-1' }} ">
                                    @foreach ($activity->documentations as $documentation)
                                        <div class="col-auto relative">
                                            <img class="mx-auto rounded-md {{ $activity->documentations->count() > 1 ? 'min-h-full' : 'w-1/2' }}"
                                                src={{ $documentation->document_image_url }}
                                                alt={{ $documentation->title }} />
                                        </div>
                                    @endforeach
                                </div>
                            @else
                                <span class="italic">Tidak Ada Dokumentasi</span>
                            @endif
                        </td>
                    </tr>
                @endforeach
                <tr class="text-center border-t-2 border-black-2 break-before-avoid">
                    <td colspan="2">
                        <div class="mt-3">
                            <p>Issued By</p>
                            <img class="w-40 mx-auto"
                                src={{ $weekly_report->issuedBy->signature_photo_url }}
                                alt="hand signature" />
                            <p class="font-bold">{{ $weekly_report->issuedBy->name }}</p>
                            <p>{{ $weekly_report->issuedBy->role->name }}</p>
                        </div>
                    </td>
                    <td colspan="5"></td>
                    <td>
                        <div class="mt-3">
                            <p>Approved By</p>
                            <img class="w-40 mx-auto"
                                src={{ $weekly_report->approvedBy->signature_photo_url }}
                                alt="hand signature" />
                            <p class="font-bold">{{ $weekly_report->approvedBy->name }}</p>
                            <p>{{ $weekly_report->approvedBy->role->name }}</p>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        {{-- </div> --}}
    </div>

    <script type="text/javascript">
        window.print();
    </script>
</body>

</html>
