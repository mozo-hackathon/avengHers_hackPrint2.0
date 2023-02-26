import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
export default function Faqs() {
  return (
    <div id="faqs">
    
        <section class="text-gray-700" >
          <div class="container px-6 py-5 my-10 mx-auto border border-gray50 rounded-lg shadow-xl">
            <div class="text-center mb-20">
              <h1 class="sm:text-4xl text-4xl font-medium text-center title-font text-gray-900 mb-4">
                Frequently Asked Question
              </h1>
              <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                The most common questions about how our business works and what
                can we do the best for you.
              </p>
            </div>
            <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
              <div class="w-full lg:w-1/2 px-4 py-2">
                <details class="mb-4">
                  <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                    How can I make claims under health insurance policy?
                  </summary>

                  <span>
                    In case of cashless hospitalization, you need to show the health card to the network hospital and also need to get approval from your insurer/its assigned TPA. If you are admitted in a non-network hospital of the insurer, you firstly need to pay all the medical bills on your own and then claim the reimbursement for the expenses incurred.
                  </span>
                </details>
                <details class="mb-4">
                  <summary class="font-semibold bg-gray-200 rounded-md py-2 px-4">
                    What is the maximum number of claims I can take in one year?
                  </summary>

                  <span>
                    You can make any number of claims in a policy year. However, the sum insured is the maximum limit you can claim for in a policy year. If the sum insured is exhausted, you can’t make more claim in the same policy year. But some health insurance companies have come up with top-up and super top-up health cover that covers your additional medical expenses incurred over and above the limit of the sum assured.
                  </span>
                </details>
                <details class="mb-4">
                  <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                    Is there any waiting period to make claims under a health insurance policy?
                  </summary>

                  <span>
                    Yes, normally there is a waiting period of 30 days from the date of inception of the policy; during which, the insurer will not be bound to pay you any hospitalization bill. However, in case of an emergency occurring due to an accident, there is no such restriction, and the insurance company will pay your medical expenses.
                  </span>
                </details>
              </div>
              <div class="w-full lg:w-1/2 px-4 py-2">
                <details class="mb-4">
                  <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                    What are the documents required to be submitted for making claim?
                  </summary>

                  <span class="px-4 py-2">
                    These are the documents that require to be submitted while making claim for motor insurance policy-
                    <br></br>
                    (a)    Duly filled up and signed claim form (form can be downloaded from company’s website)
                    <br></br>
                    (b)   RC (Registration Certificate) copy of your car
                    <br></br>
                    (c)    Original estimate of loss
                    <br></br>
                    (d)   Original invoice and payment receipts

                    <br></br>

                    For policy with cashless facility, only repair invoice with FIR (if required) need to be submitted.



                    For theft claim, keys with non-traceable certificate need to be submitted.
                  </span>
                </details>
                <details class="mb-4">
                  <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                    Is there a time frame to fill a claim?
                  </summary>

                  <span class="px-4 py-2">
                    Yes, as a insurance policy holder, you must fill the claims on time. Not raising claims within appropriate time limit is one of the common reasons for claim rejection by the insurer.
                  </span>
                </details>
                <details class="mb-4">
                  <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                    How can I communicate with you?
                  </summary>

                  <span class="px-4 py-2">
                    Contact us
                  </span>
                </details>
              </div>
            </div>
          </div>
        </section>
      
    </div>
  )
}
