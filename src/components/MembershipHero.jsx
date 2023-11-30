import {useNavigate} from "react-router-dom";

const MembershipHero = () => {
    const navigate = useNavigate();

    function goToConstruction() {
        navigate("/notyetdone")
    }

    return (
        <div className="mt-20 ">
            <div className="text-center">
                <h1 className="text-white font-playfair text-[32px] font-semibold">Membership Perks</h1>
            </div>
            <div className="mt-4 grid-cols-3 font-montserrat text-white gap-y-3 text-[20px] sm:grid hidden">
                <p></p>
                <p className="text-gray-400 font-playfair text-[32px] text-center">Silver Tier</p>
                <p className="text-amber-300 font-playfair text-[32px] text-center">Gold Tier</p>

                <p className="px-2">Price (Monthly)</p>
                <p className="text-center">$5.99</p>
                <p className="text-center">$10.99</p>

                <p className="px-2">Free Movies per Week</p>
                <p className="text-center">1</p>
                <p className="text-center">3</p>

                <p className="px-2">Points per Dollar</p>
                <p className="text-center">0.5</p>
                <p className="text-center">1</p>

                <p className="px-2">Discount on Concessions</p>
                <p className="text-center">10%</p>
                <p className="text-center">20%</p>

                <p className="px-2">Special Birthday Gift</p>
                <p className="text-center">Yes</p>
                <p className="text-center">Yes</p>

                <p className="px-2">Free Large Popcorn Refill</p>
                <p className="text-center">Yes</p>
                <p className="text-center">Yes</p>

                <p className="px-2">Waived Online Fees</p>
                <p className="text-center">Yes</p>
                <p className="text-center">Yes</p>

                <p className="px-2">Priority Seats on New Releases</p>
                <p className="text-center">Varies*</p>
                <p className="text-center">Yes</p>

                <p className="px-2">Exclusive Member Screenings</p>
                <p className="text-center">No</p>
                <p className="text-center">Yes</p>

                <div/>

                <div className="mt-3 text-center text-[16px]">
                    <button
                        type="button"
                        onClick={goToConstruction}
                        className="rounded-full px-2 py-1 bg-black text-white border-white border-[2px] w-[120px] h-[50px] hover:border-sky-400 hover:text-sky-400 font-montserrat font-bold "
                    >
                        Join Now
                    </button>
                </div>

                <div className="mt-3 text-center text-[16px]">
                    <button
                        type="button"
                        onClick={goToConstruction}
                        className="rounded-full px-2 py-1 bg-white text-black border-black border-[2px] w-[120px] h-[50px] hover:border-sky-400 hover:text-sky-400 font-montserrat font-bold "
                    >
                        Join Now
                    </button>
                </div>
            </div>

            <div className="mt-4 font-montserrat text-white gap-y-3 text-[20px] sm:hidden flex flex-col">
                <div className="flex flex-row justify-around">
                <p className="text-gray-400 font-playfair text-[32px] text-center">Silver Tier</p>
                <p className="text-amber-300 font-playfair text-[32px] text-center">Gold Tier</p>
                </div>

                <p className="text-center">Price (Monthly)</p>
                <div className="flex flex-row justify-around">
                <p className="text-center">$5.99</p>
                <p className="text-center">$10.99</p>
                </div>

                <p className="text-center">Free Movies per Week</p>
                <div className="flex flex-row justify-around">
                <p className="text-center">1</p>
                <p className="text-center">3</p>
                </div>

                <p className="text-center">Points per Dollar</p>
                <div className="flex flex-row justify-around">
                <p className="text-center">0.5</p>
                <p className="text-center">1</p>
                </div>

                <p className="text-center">Discount on Concessions</p>
                <div className="flex flex-row justify-around">
                <p className="text-center">10%</p>
                <p className="text-center">20%</p>
                </div>

                <p className="text-center">Special Birthday Gift</p>
                <div className="flex flex-row justify-around">
                <p className="text-center">Yes</p>
                <p className="text-center">Yes</p>
                </div>

                <p className="text-center">Free Large Popcorn Refill</p>
                <div className="flex flex-row justify-around">
                <p className="text-center">Yes</p>
                <p className="text-center">Yes</p>
                </div>

                <p className="text-center">Waived Online Fees</p>
                <div className="flex flex-row justify-around">
                    <p className="text-center">Yes</p>
                    <p className="text-center">Yes</p>
                </div>

                <p className="text-center">Priority Seats on New Releases</p>
                <div className="flex flex-row justify-around">
                <p className="text-center">Varies*</p>
                <p className="text-center">Yes</p>
                </div>

                <p className="text-center">Exclusive Member Screenings</p>
                <div className="flex flex-row justify-around">
                <p className="text-center">No</p>
                <p className="text-center">Yes</p>
                </div>

                <div/>

                <div className="mt-3 text-center flex justify-around text-[16px]">
                    <button
                        type="button"
                        onClick={goToConstruction}
                        className="rounded-full px-2 py-1 bg-black text-white border-white border-[2px] w-[120px] h-[50px] hover:border-sky-400 hover:text-sky-400 font-montserrat font-bold"
                    >
                        Join Now
                    </button>
                    <button
                        type="button"
                        onClick={goToConstruction}
                        className="rounded-full px-2 py-1 bg-white text-black border-black border-[2px] w-[120px] h-[50px] hover:border-sky-400 hover:text-sky-400 font-montserrat font-bold "
                    >
                        Join Now
                    </button>
                </div>
            </div>

            <div className="mt-12 text-dimWhite italic">
                *Priority Seating depends on the expected volume of customers based on the release for Silver Tier members.
                <br/><br/>
                Pricing and benefits are subject to change. For a full list of applicable terms and conditions, visit .
                <br/><br/>
                Membership Validity:
                Apex Theatre reserves the right to modify or terminate the membership program and its benefits at any time. Members will be notified of any changes to the program.
                <br/><br/>
                Membership Renewal and Cancellation:
                Memberships are on a monthly recurring basis until cancellation by the member. Cancellations can be done through the member&apos;s online account or by contacting our customer support.
                <br/><br/>
                Age Verification:
                Certain membership benefits, such as discounts on age-restricted films, may require age verification.
                <br/><br/>
                Updates to Terms and Conditions:
                Apex Theatre membership terms and conditions are subject to change. Members are encouraged to review the terms regularly for updates.
            </div>
        </div>
    );
};

export default MembershipHero;